const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql/type');
const { todoType } = require('./todo');
const Task = require('../model/Todo');

const mutation = new GraphQLObjectType({
    name: 'TodoMutations',
    description: 'Mutations for todo lists',
    fields: () => ({
        deleteTodo: {
            type: todoType,
            description: 'Delete an todo with id.',
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (value, { _id }) => Task.remove({_id}, null)
        }
    }),
});

module.exports = {
    mutation,
};