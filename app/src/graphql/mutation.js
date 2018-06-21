const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql/type');
const { todoType, todoInputType } = require('./todo');
const Task = require('../model/Todo');

const mutation = new GraphQLObjectType({
    name: 'TodoMutation',
    description: 'Mutations for todo lists',
    fields: () => ({
        deleteTask: {
            type: todoType,
            description: 'Delete an todo with id.',
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { _id }) => Task.remove({ _id }).catch(() => {
                throw new Error('Error deleting task');
            }),
        },
        updateTask: {
            type: todoType,
            description: 'Add or update todo based on detection of ID.',
            args: {
                _id: { type: GraphQLString },
                task: { type: todoInputType },
            },
            resolve: (_, { _id, task }) => {
                if (!_id) {
                    return Task.create(task).catch(() => {
                        throw new Error('Error creating task');
                    });
                }
                return Task.findOneAndUpdate({ _id }, { ...task, _id }, { new: true })
                    .catch(() => {
                        throw new Error(`Error updating task with id ${_id}`);
                    });
            },
        },
    }),
});

module.exports = {
    mutation,
};
