const { GraphQLNonNull } = require('graphql/type');
const { fromGlobalId } = require('graphql-relay');
const TaskInput = require('./TaskInput');
const EditTaskInput = require('./EditTaskInput');
const TaskPayload = require('./TaskPayload');
const { Task } = require('../../model/index');

const addTask = {
    type: TaskPayload,
    description: 'Add a task',
    args: {
        input: {
            type: new GraphQLNonNull(TaskInput),
        },
    },
    resolve: (_, { input: { name, description, clientMutationId } }) => {
        const createdTask = new Task({ name, description });

        return Task.create(createdTask).then(task => ({
            clientMutationId,
            task,
        })).catch(() => {
            throw new Error('Error creating task');
        });
    },
};

const editTask = {
    type: TaskPayload,
    description: 'Add a task',
    args: {
        input: {
            type: new GraphQLNonNull(EditTaskInput),
        },
    },
    resolve: (_, { input: { id, name, description, status, clientMutationId } }) => {
        const { id: _id } = fromGlobalId(id);
        const taskToEdit = new Task({ _id, name, description, status });

        return Task.findOneAndUpdate({ _id }, taskToEdit, { new: true }).then(task => ({
            clientMutationId,
            task,
        })).catch(() => {
            throw new Error('Error editing task');
        });
    },
};


module.exports = {
    addTask,
    editTask,
};
