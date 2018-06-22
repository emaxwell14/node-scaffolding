const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql/type');
const TaskType = require('./TaskType');

module.exports = new GraphQLObjectType({
    name: 'TaskPayload',
    fields: () => ({
        clientMutationId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The relay mutation id. Required',
        },
        task: {
            type: new GraphQLNonNull(TaskType),
            description: 'The task that is created. Required',
        },
    }),
});
