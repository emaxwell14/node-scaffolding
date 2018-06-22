const { GraphQLString, GraphQLInputObjectType, GraphQLNonNull } = require('graphql/type');

module.exports = new GraphQLInputObjectType({
    name: 'AddUserInput',
    fields: () => ({
        clientMutationId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The relay mutation id. Required',
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the user. Required',
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The email of the user. Required',
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The password of the user. Required',
        },
    }),
});
