const { GraphQLString, GraphQLInputObjectType, GraphQLNonNull } = require('graphql/type');

module.exports = new GraphQLInputObjectType({
    name: 'TaskInput',
    fields: () => ({
        clientMutationId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The relay mutation id',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the task',
        },
        description: {
            type: GraphQLString,
            description: 'The description of the task',
        },
    }),
});
