const { GraphQLObjectType, GraphQLString } = require('graphql/type');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('./relayNode');
const StatusEnumType = require('./StatusEnumType');

module.exports = new GraphQLObjectType({
    name: 'Task',
    description: 'todo item',
    fields: () => ({
        id: globalIdField('task'),
        name: {
            type: GraphQLString,
            description: 'The name of the todo.',
        },
        description: {
            type: GraphQLString,
            description: 'The description of the todo.',
        },
        createdDate: {
            type: GraphQLString,
            description: 'The created date of the todo',
        },
        status: {
            type: StatusEnumType,
        },
    }),
    interfaces: [nodeInterface],
});
