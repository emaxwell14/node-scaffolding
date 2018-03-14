const express = require('express');
const expressGraphql = require('express-graphql');
const { schema } = require('./src/graphql/schema');
const dbService = require('./databaseService');

const port = process.env.API_PORT || 8080;
const endpoint = '/graphql';

// DB connection
dbService.init();

// Create an express server and a GraphQL endpoint
const app = express();
app.use(endpoint, expressGraphql({
    schema,
    graphiql: process.env.ENVIRONMENT !== 'PROD',
}));

app.listen(port, () =>
    console.log(`Server running on localhost:${port}${endpoint}`),
);
