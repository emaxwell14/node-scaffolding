const { GraphQLSchema, GraphQLObjectType } = require('graphql/type');
const { query, mutation } = require('./task/index');
const { node, nodes } = require('./relayNode');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            node,
            nodes,
            ...query,
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            ...mutation,
        },
    }),
});
