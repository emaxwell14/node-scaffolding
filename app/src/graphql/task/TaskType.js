const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql/type');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../relayNode');
const StatusEnumType = require('./StatusEnumType');

module.exports = new GraphQLObjectType({
    name: 'Task',
    description: 'Task item',
    fields: () => ({
        id: globalIdField('task'),
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the task. Required',
        },
        description: {
            type: GraphQLString,
            description: 'The description of the task',
        },
        createdDate: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The created date of the task',
        },
        status: {
            type: StatusEnumType,
        },
        userId: globalIdField('user'),
    }),
    interfaces: [nodeInterface],
});
