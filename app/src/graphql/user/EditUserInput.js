const { GraphQLString, GraphQLInputObjectType, GraphQLNonNull, GraphQLID } = require('graphql/type');

module.exports = new GraphQLInputObjectType({
    name: 'EditUserInput',
    fields: () => ({
        clientMutationId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The relay mutation id. Required',
        },
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The global id of the user. Required',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the user',
        },
        email: {
            type: GraphQLString,
            description: 'The email of the user',
        },
        password: {
            type: GraphQLString,
            description: 'The password of the user',
        },
    }),
});
