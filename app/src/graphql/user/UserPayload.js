const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql/type');
const UserType = require('./UserType');

module.exports = new GraphQLObjectType({
    name: 'UserPayload',
    fields: () => ({
        clientMutationId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The relay mutation id. Required',
        },
        user: {
            type: new GraphQLNonNull(UserType),
            description: 'The user that is created. Required',
        },
    }),
});
