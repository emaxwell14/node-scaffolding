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
            resolve: (_, { _id }) => Task.remove({ _id }),
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
                    return Task.create(task, e => console.log('ERROR ON CREATE: ', e));
                }
                return Task.findOneAndUpdate({ _id }, { ...task, _id }, { new: true },
                    e => console.log('ERROR ON CREATE: ', e));
            },
        },
    }),
});

module.exports = {
    mutation,
};
