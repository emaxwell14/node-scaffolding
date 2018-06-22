const { GraphQLString, GraphQLInputObjectType, GraphQLNonNull } = require('graphql/type');

module.exports = new GraphQLInputObjectType({
    name: 'AddTaskInput',
    fields: () => ({
        clientMutationId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The relay mutation id. Required',
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the task. Required',
        },
        description: {
            type: GraphQLString,
            description: 'The description of the task',
        },
    }),
});
