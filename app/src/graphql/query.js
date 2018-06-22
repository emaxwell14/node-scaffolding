const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLList } = require('graphql/type');
const { fromGlobalId } = require('graphql-relay');
const Task = require('../model/Task');
const TaskType = require('./TaskType');
const { node, nodes } = require('./relayNode');

module.exports = new GraphQLObjectType({
    name: 'Query',
    fields: {
        task: {
            name: 'task',
            description: 'Get task by id',
            type: TaskType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
            resolve: (root, { id }) => {
                const { id: _id } = fromGlobalId(id);
                return Task.findById({ _id })
                    .catch(() => {
                        throw new Error(`Error searching for task with id ${_id}`);
                    });
            },
        },
        tasks: {
            name: 'tasks',
            description: 'Get all tasks',
            type: new GraphQLList(TaskType),
            resolve: () => Task.find()
                .catch(() => {
                    throw new Error('Error searching for tasks');
                }),
        },
        node,
        nodes,
    },
});
