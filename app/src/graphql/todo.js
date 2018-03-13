const { GraphQLObjectType, GraphQLString, GraphQLEnumType } = require('graphql/type');

const statusEnumType = new GraphQLEnumType({
    name: 'StatusEnum',
    description: 'The status of the todo.',
    values: {
        pending: { value: "pending" },
        ongoing: { value: 'ongoing' },
        completed: { value: 'completed' },
    },
});

const todoType = new GraphQLObjectType({
    name: 'todo',
    description: 'todo item',
    fields: () => ({
        _id: {
            type: GraphQLString,
            description: 'The mongo id of the todo.',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the todo.',
        },
        description: {
            type: GraphQLString,
            description: 'The description of the todo.',
        },
        createdDate: {
            type: GraphQLString,
            description: 'The created date of the todo'
        },
        status: {
            type: statusEnumType,
        },
    }),
});

module.exports = {
    todoType,
}