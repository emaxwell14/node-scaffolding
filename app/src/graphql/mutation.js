const { GraphQLObjectType, GraphQLNonNull } = require('graphql/type');
const TaskInput = require('./TaskInput');
const TaskPayload = require('./TaskPayload');
const Task = require('../model/Todo');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addTask: {
            type: TaskPayload,
            description: 'Add a task',
            args: {
                input: {
                    type: new GraphQLNonNull(TaskInput),
                },
            },
            resolve: (_, { input: { name, description, clientMutationId } }) => {
                const createdTask = new Task();
                createdTask.name = name;
                createdTask.description = description;

                return Task.create(createdTask).then(task => ({
                    clientMutationId,
                    task,
                })).catch(() => {
                    throw new Error('Error creating task');
                });
            },

        },
    }),
});

module.exports = mutation;
