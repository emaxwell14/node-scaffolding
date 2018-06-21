const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql/type');
const Task = require('../model/Todo');
const { todoType } = require('./todo');
const NotFoundException = require('../errors/NotFoundError');

const query = new GraphQLObjectType({
    name: 'TodoQuery',
    fields: {
        task: {
            type: todoType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { _id }) => Task.findById({ _id })
                .catch(() => {
                    throw new NotFoundException(`Task not found with id ${_id}`);
                }),
        },
        tasks: {
            type: new GraphQLList(todoType),
            resolve: () => Task.find({})
                .catch(() => {
                    throw new NotFoundException('Error when retrieving tasks');
                }),
        },
    },
});

module.exports = {
    query,
};
