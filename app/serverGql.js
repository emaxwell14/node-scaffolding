const express = require('express');
const express_graphql = require('express-graphql');
const { schema } = require('./src/graphql/schema');
const dbService = require('./databaseService');
const port = process.env.API_PORT || 8080;
const endpoint = '/graphql';

const app = express();

// DB connection
dbService.init();

// Create an express server and a GraphQL endpoint
app.use(endpoint, express_graphql({
    schema,
    graphiql: process.env.ENVIRONMENT !== 'PROD',
}));

app.listen(port, () =>
    console.log(`Server running on localhost:${port}/${endpoint}`)
);
