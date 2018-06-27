const { connectionArgs } = require('graphql-relay');
const { Task } = require('../../model');
const { TaskConnection } = require('../task');
const { paginate: { getPaginatedCollection } } = require('../../utils');

const userTasks = {
    name: 'tasks',
    description: 'Get all user\'s tasks',
    type: TaskConnection,
    args: connectionArgs,
    resolve: (root, args) =>
        getPaginatedCollection(Task, { userId: root._id }, {}, args).catch((e) => {
            throw new Error(`Error searching for user's task: ${e.message}`);
        }),
};

module.exports = {
    userTasks,
};
