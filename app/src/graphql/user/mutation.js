const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql/type');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');
const UserType = require('./UserType');
const { User } = require('../../model');

const addUser = mutationWithClientMutationId({
    name: 'addUser',
    description: 'Add a user',
    inputFields: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the user. Required',
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The email of the user. Required',
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The password of the user. Required',
        },
    },
    outputFields: {
        user: {
            type: new GraphQLNonNull(UserType),
            description: 'The user that is created. Required',
            // resolve: payload => payload, // Pass result directly or use then in mutate
        },
    },
    mutateAndGetPayload: ({ name, email, password }) => {
        const createdUser = new User({ name, email, password });
        return User.create(createdUser)
            .then(user => ({ user }))
            .catch((e) => {
                throw new Error(`Error creating user: ${e.message}`);
            });
    },
});

const editUser = mutationWithClientMutationId({
    name: 'editUser',
    description: 'Edit a user',
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The global id of the user. Required',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the user',
        },
        email: {
            type: GraphQLString,
            description: 'The email of the user',
        },
        password: {
            type: GraphQLString,
            description: 'The password of the user',
        },
    },
    outputFields: {
        user: {
            type: new GraphQLNonNull(UserType),
            description: 'The user that is updated. Required',
        },
    },
    mutateAndGetPayload: ({ id, name, email, password }) => {
        const { id: _id } = fromGlobalId(id);
        const userToEdit = new User({ _id, name, email, password });
        return User.findOneAndUpdate({ _id }, userToEdit, { new: true })
            .then(user => ({ user }))
            .catch((e) => {
                throw new Error(`Error editing user: ${e.message}`);
            });
    },
});


module.exports = {
    addUser,
    editUser,
};
