const { GraphQLSchema } = require('graphql/type');
const { query } = require('./query');
const { mutation } = require('./mutation');

const schema = new GraphQLSchema({
    query,
    mutation,
});

module.exports = {
    schema,
};
