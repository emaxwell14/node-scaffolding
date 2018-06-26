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

const abstractPagination = (collection, query, { first, last, before, after }) => {
    if (first && last) {
        throw new Error('"first" and "last" cannot be present at same time');
    }
    if (before && after) {
        throw new Error('"before" and "after" cannot be present at same time');
    }

    return collection.count(query).then((count) => {
        const queryWithOptions = collection.find(query);
        if (first) {
            queryWithOptions.limit(first);
        }

        if (last) {
            queryWithOptions.skip(count - last);
        }

        return queryWithOptions.then((data) => {
            const edges = data.map(node => ({
                cursor: uuidv4(),
                node,
            }));

            // TODO additional data not in result
            return {
                edges,
                totalCount: count,
                pageInfo: {
                    cursor: edges[edges.length - 1].cursor,
                    hasPreviousPage: Boolean(first && count > first),
                    hasNextPage: Boolean(last && count > last),
                },
            };
        });
    });
};

const tasks = {
    name: 'tasks',
    description: 'Get all tasks',
    type: TaskConnection,
    args: connectionArgs,
    resolve: (root, args) => {
        // If field of a previous query, use id to get tasks
        // TODO create a separate connection for this in user query. After pagination is extracted
        const query = root ? { userId: root._id } : {};

        return abstractPagination(Task, query, args).catch(() => {
            throw new Error('Error searching for tasks');
        });
    },
};

module.exports = {
    task,
    tasks,
};
