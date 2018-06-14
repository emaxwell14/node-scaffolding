/* eslint-disable no-console */
const express = require('express');
const expressGraphql = require('express-graphql'); // apollo-server-express?
const cors = require('cors');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const { schema } = require('./src/graphql/schema');
const dbService = require('./databaseService');

const port = process.env.API_PORT || 8080;
const endpoint = '/graphql';
const isProd = process.env.ENVIRONMENT === 'PROD';

// DB connection
dbService.init();

// Create an express server and a GraphQL endpoint
const app = express();

// Log requests
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(chalk.magenta('Request received', JSON.stringify(req.body)));
    next();
});

// Define middleware
app.use(cors());
app.use(endpoint, expressGraphql({
    schema,
    graphiql: !isProd,
}));

app.listen(port, () =>
    console.log(chalk.blue(`Server running on localhost:${port}${endpoint}`)),
);
