const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql/type');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');
const TaskType = require('./TaskType');
const StatusEnumType = require('./StatusEnumType');
const { Task } = require('../../model');

const addTask = mutationWithClientMutationId({
    name: 'addTask',
    description: 'Add a task',
    inputFields: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the task. Required',
        },
        description: {
            type: GraphQLString,
            description: 'The description of the task',
        },
        userId: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The global id of the user creating the task. Required',
        },
    },
    outputFields: {
        task: {
            type: new GraphQLNonNull(TaskType),
            description: 'The task that is created. Required',
        },
    },
    mutateAndGetPayload: ({ name, description, userId: globalUserId }) => {
        const { id: userId } = fromGlobalId(globalUserId);
        const createdTask = new Task({ name, description, userId });

        return Task.create(createdTask)
            .then(task => ({ task }))
            .catch((e) => {
                throw new Error(`Error creating task: ${e.message}`);
            });
    },
});

const editTask = mutationWithClientMutationId({
    name: 'editTask',
    description: 'Edit a task',
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The global id of the task. Required',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the task. Not required',
        },
        description: {
            type: GraphQLString,
            description: 'The description of the task. Not required',
        },
        status: {
            type: StatusEnumType,
        },
    },
    outputFields: {
        task: {
            type: new GraphQLNonNull(TaskType),
            description: 'The task that is created. Required',
        },
    },
    mutateAndGetPayload: ({ id, name, description, status }) => {
        const { id: _id } = fromGlobalId(id);
        const taskToEdit = new Task({ _id, name, description, status });

        return Task.findOneAndUpdate({ _id }, taskToEdit, { new: true })
            .then(task => ({ task }))
            .catch((e) => {
                throw new Error(`Error editing task: ${e.message}`);
            });
    },
});

const deleteTask = mutationWithClientMutationId({
    name: 'deleteTask',
    description: 'Delete a task',
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The global id of the task. Required',
        },
    },
    mutateAndGetPayload: ({ id }) => {
        const { id: _id } = fromGlobalId(id);
        return Task.deleteOne({ _id })
            .catch((e) => {
                throw new Error(`Error deleting task: ${e.message}`);
            });
    },
});


module.exports = {
    addTask,
    editTask,
    deleteTask,
};
