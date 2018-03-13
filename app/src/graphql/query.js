const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql/type');
const Task = require('../model/Todo');
const { todoType } = require('./todo');

const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getTask: {
            type:todoType,
            args: {
                _id: {
                    name: '_id',
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            // TODO if none found, return error or null.
            resolve: (value, { _id }) => Task.find({ _id }),
        },
        getTasks: {
            type: new GraphQLList(todoType),
            resolve: () => Task.find({}),
        },
    },
});

module.exports = {
    query,
}