const { GraphQLObjectType, GraphQLString } = require('graphql/type');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('./relayNode');
const StatusEnumType = require('./StatusEnumType');

module.exports = new GraphQLObjectType({
    name: 'Task',
    description: 'Task item',
    fields: () => ({
        id: globalIdField('task'),
        name: {
            type: GraphQLString,
            description: 'The name of the task.',
        },
        description: {
            type: GraphQLString,
            description: 'The description of the task.',
        },
        createdDate: {
            type: GraphQLString,
            description: 'The created date of the task',
        },
        status: {
            type: StatusEnumType,
        },
    }),
    interfaces: [nodeInterface],
});
