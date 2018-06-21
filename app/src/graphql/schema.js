const { GraphQLSchema } = require('graphql/type');
const query = require('./query');
const mutation = require('./mutation');

module.exports = new GraphQLSchema({
    query,
    mutation,
});
