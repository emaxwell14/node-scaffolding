const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql/type');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../relayNode');
const { taskQuery: { tasks } } = require('../task');

module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'User item',
    fields: () => ({
        id: globalIdField('user'),
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
        createdDate: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The created date of the user. Required',
        },
        tasks,
    }),
    interfaces: [nodeInterface],
});
