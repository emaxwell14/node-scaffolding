const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql/type');
const Task = require('../model/Todo');
const { todoType } = require('./todo');
const logger = require('../utils/logger');

const query = new GraphQLObjectType({
    name: 'TodoQuery',
    fields: {
        task: {
            type: todoType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
            },
            // TODO if none found, return error or null.
            resolve: (_, { _id }) => Task.findById({ _id }, e => logger.error('ERROR ON QUERY: ', e)),
        },
        tasks: {
            type: new GraphQLList(todoType),
            resolve: () => Task.find({}, e => logger.error('ERROR ON QUERY: ', e)),
        },
    },
});

module.exports = {
    query,
};
