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
    },
    outputFields: {
        task: {
            type: new GraphQLNonNull(TaskType),
            description: 'The task that is created. Required',
        },
    },
    mutateAndGetPayload: ({ name, description }) => {
        const createdTask = new Task({ name, description });

        return Task.create(createdTask)
            .then(task => ({ task }))
            .catch(() => {
                throw new Error('Error creating task');
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
    mutateAndGetPayload: (_, { input: { id, name, description, status } }) => {
        const { id: _id } = fromGlobalId(id);
        const taskToEdit = new Task({ _id, name, description, status });

        return Task.findOneAndUpdate({ _id }, taskToEdit, { new: true })
            .then(task => ({ task }))
            .catch(() => {
                throw new Error('Error editing task');
            });
    },
});


module.exports = {
    addTask,
    editTask,
};
