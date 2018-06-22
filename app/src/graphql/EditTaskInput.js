const { GraphQLString, GraphQLInputObjectType, GraphQLNonNull, GraphQLID } = require('graphql/type');
const StatusEnumType = require('./StatusEnumType');

module.exports = new GraphQLInputObjectType({
    name: 'EditTaskInput',
    fields: () => ({
        clientMutationId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The relay mutation id.',
        },
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The global id of the task.',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the task.',
        },
        description: {
            type: GraphQLString,
            description: 'The description of the task.',
        },
        status: {
            type: StatusEnumType,
        },
    }),
});
