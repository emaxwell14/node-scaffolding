const { GraphQLSchema, GraphQLObjectType } = require('graphql/type');
const { taskQuery, taskMutation } = require('./task');
const { userQuery, userMutation } = require('./user');
const { node, nodes } = require('./relayNode');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            node,
            nodes,
            ...taskQuery,
            ...userQuery,
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            ...taskMutation,
            ...userMutation,
        },
    }),
});
