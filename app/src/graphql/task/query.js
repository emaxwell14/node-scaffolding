const { GraphQLNonNull, GraphQLID } = require('graphql/type');
const { fromGlobalId, connectionArgs } = require('graphql-relay');
const { Task } = require('../../model');
const TaskType = require('./TaskType');
const TaskConnection = require('./TaskConnection');
const { paginate: { getPaginatedCollection } } = require('../../utils');

const task = {
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
            .catch((e) => {
                throw new Error(`Error searching for task with id ${_id}: ${e.message}`);
            });
    },
};

const tasks = {
    name: 'tasks',
    description: 'Get all tasks',
    type: TaskConnection,
    args: connectionArgs,
    resolve: (root, args) =>
        getPaginatedCollection(Task, {}, {}, args).catch((e) => {
            throw new Error(`Error searching for tasks: ${e.message}`);
        }),
};

module.exports = {
    task,
    tasks,
};
