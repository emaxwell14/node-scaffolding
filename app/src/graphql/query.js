const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require('graphql/type');
const { fromGlobalId } = require('graphql-relay');
const Task = require('../model/Todo');
const TaskType = require('./TaskType');
const NotFoundException = require('../errors/NotFoundError');
const { node, nodes } = require('./relayNode');

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        task: {
            name: 'task',
            description: 'Get task by id',
            type: TaskType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
            resolve: (root, { id }) => {
                const { id: _id } = fromGlobalId(id);
                return Task.findById({ _id })
                    . catch(() => {
                        throw new NotFoundException(`Task not found with id ${_id}`);
                    });
            },
        },
        node,
        nodes,
    },
});

module.exports = query;
