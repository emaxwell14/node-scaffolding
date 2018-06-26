const { GraphQLNonNull, GraphQLID } = require('graphql/type');
const { fromGlobalId, connectionArgs } = require('graphql-relay');
const uuidv4 = require('uuid/v4');
const { Task } = require('../../model');
const TaskType = require('./TaskType');
const TaskConnection = require('./TaskConnection');

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
            .catch(() => {
                throw new Error(`Error searching for task with id ${_id}`);
            });
    },
};

const tasks = {
    name: 'tasks',
    description: 'Get all tasks',
    type: TaskConnection,
    args: connectionArgs,
    resolve: (root, { after, before, first, last }) => {
        // If field of a previous query, use id to get tasks
        const query = root ? Task.find({ userId: root._id }) : Task.find({});

        return query.then((data) => {
            const edges = data.map(node => ({
                cursor: uuidv4(),
                node,
            }));

            return {
                edges,
                totalCount: edges.length,
                pageInfo: {
                    cursor: edges[edges.length - 1].cursor,
                    hasPreviousPage: false,
                    hasNextPage: false,
                },
            };
        }).catch(() => {
            throw new Error('Error searching for tasks');
        });
    },
};

module.exports = {
    task,
    tasks,
};
