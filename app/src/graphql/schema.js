const { GraphQLSchema } = require('graphql/type');
const query = require('./query');

module.exports = new GraphQLSchema({
    query,
});
