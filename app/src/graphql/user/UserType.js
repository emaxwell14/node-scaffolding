const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql/type');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../relayNode');

module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'User item',
    fields: () => ({
        id: globalIdField('user'),
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the user',
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The email of the user',
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The password of the user',
        },
        createdDate: {
            type: GraphQLString,
            description: 'The created date of the user',
        },
    }),
    interfaces: [nodeInterface],
});
