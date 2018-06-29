const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const cors = require('cors');
const bodyParser = require('body-parser');
const schema = require('./src/graphql/schema');
const jwt = require('express-jwt');
const dbService = require('./databaseService');
const { logger } = require('./src/utils');
const configurationService = require('./src/service/configurationService');

const PORT = configurationService.getServerPort();
const ENDPOINT = '/graphql';

// DB connection
dbService.init();

// Create an express server and a GraphQL endpoint
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Not blocking request, jwt just used to put user in context. If not present, will handle authorization in resolver
const auth = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
});

app.use(ENDPOINT, auth, graphqlExpress(req => ({
    schema,
    debug: true,
    formatError: (error) => {
        logger.error(error);
        return {
            message: error.message,
            state: error.originalError && error.originalError.state,
            type: error.originalError && error.originalError.type,
            locations: error.locations,
            path: error.path,
        };
    },
    context: {
        user: req.user,
    },
})));

app.get('/graphiql', graphiqlExpress({
    endpointURL: ENDPOINT,
}));

app.listen(PORT, () => logger.info(`Server running on localhost:${PORT}${ENDPOINT}`));
