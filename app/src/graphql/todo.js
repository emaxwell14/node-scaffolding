const { GraphQLObjectType, GraphQLString, GraphQLEnumType, GraphQLInputObjectType, GraphQLID,
} = require('graphql/type');

const statusEnumType = new GraphQLEnumType({
    name: 'StatusEnum',
    description: 'The status of the todo.',
    values: {
        pending: { value: 'pending' },
        ongoing: { value: 'ongoing' },
        completed: { value: 'completed' },
    },
});

const todoType = new GraphQLObjectType({
    name: 'todoType',
    description: 'todo item',
    fields: () => ({
        _id: {
            type: GraphQLID,
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
            description: 'The created date of the todo',
        },
        status: {
            type: statusEnumType,
        },
    }),
});

const todoInputType = new GraphQLInputObjectType({
    name: 'todoInputType',
    description: 'todo input item',
    fields: () => ({
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
            description: 'The created date of the todo',
        },
        status: {
            type: statusEnumType,
        },
    }),
});


module.exports = {
    todoType,
    todoInputType,
};
