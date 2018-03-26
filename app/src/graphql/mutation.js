const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql/type');
const { todoType, todoInputType } = require('./todo');
const Task = require('../model/Todo');

const mutation = new GraphQLObjectType({
    name: 'TodoMutation',
    description: 'Mutations for todo lists',
    fields: () => ({
        deleteTodo: {
            type: todoType,
            description: 'Delete an todo with id.',
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { _id }) => Task.remove({ _id }),
        },
        updateTodo: {
            type: todoType,
            description: 'Add or update todo based on detection of ID.',
            args: {
                todo: { type: todoInputType },
            },
            resolve: (_, { todo }) => {
                if (!todo._id) {
                    return new Task(todo).save();
                }
                return Task.findOneAndUpdate({ _id: todo._id }, todo, { new: true });
            },
        },
    }),
});

module.exports = {
    mutation,
};
