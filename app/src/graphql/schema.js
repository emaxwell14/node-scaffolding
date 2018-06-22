const { GraphQLSchema, GraphQLObjectType } = require('graphql/type');
const { taskQuery, taskMutation } = require('./task/index');
const { userQuery, userMutation } = require('./user/index');
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
