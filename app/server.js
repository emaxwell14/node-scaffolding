const express = require('express');
const expressGraphql = require('express-graphql'); // apollo-server-express?
const cors = require('cors');
const bodyParser = require('body-parser');
const { schema } = require('./src/graphql/schema');
const dbService = require('./databaseService');
const logger = require('./src/utils/logger');
const configurationService = require('./src/service/configurationService');

const port = configurationService.getServerPort();
const isProd = configurationService.getEnvironment === 'prod';
const endpoint = '/graphql';

// DB connection
dbService.init();

// Create an express server and a GraphQL endpoint
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Log requests
app.use((req, res, next) => {
    logger.debug('Request received', JSON.stringify(req.body));
    next();
});

// Define middleware
app.use(cors());
app.use(endpoint, expressGraphql({
    schema,
    graphiql: !isProd,
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
}));

app.listen(port, () => logger.info(`Server running on localhost:${port}${endpoint}`));
