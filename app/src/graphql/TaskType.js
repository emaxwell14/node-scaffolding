const { GraphQLObjectType, GraphQLString, GraphQLEnumType, GraphQLID } = require('graphql/type');
const { globalIdField } = require('graphql-relay');

const statusEnumType = new GraphQLEnumType({
    name: 'StatusEnum',
    description: 'The status of the todo.',
    values: {
        pending: { value: 'pending' },
        ongoing: { value: 'ongoing' },
        completed: { value: 'completed' },
    },
});

const TaskType = new GraphQLObjectType({
    name: 'Task',
    description: 'todo item',
    fields: () => ({
        // TODO handle global id
        // id: globalIdField('task'),
        _id: {
            type: GraphQLID,
            description: 'The mongo id of the todo.',
        },
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
            type: statusEnumType,
        },
    }),
});

module.exports = TaskType;
