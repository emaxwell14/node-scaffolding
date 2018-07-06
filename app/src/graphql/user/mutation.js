const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql/type');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');
const bcrypt = require('bcrypt');
const UserType = require('./UserType');
const { User, Task } = require('../../model');

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
    mutateAndGetPayload: ({ name, email, password }) =>
        bcrypt.hash(password, 10).then((encryptedPassword) => {
            const createdUser = new User({ name, email, password: encryptedPassword });
            return User.create(createdUser)
                .then(user => ({ user }))
                .catch((e) => {
                    throw new Error(`Error creating user: ${e.message}`);
                });
        }),
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
        bcrypt.hash(password, 10).then((encryptedPassword) => {
            const { id: _id } = fromGlobalId(id);
            const userToEdit = new User({ _id, name, email, password: encryptedPassword });
            return User.findOneAndUpdate({ _id }, userToEdit, { new: true })
                .then(user => ({ user }))
                .catch((e) => {
                    throw new Error(`Error editing user: ${e.message}`);
                });
        });
    },
});

const deleteUser = mutationWithClientMutationId({
    name: 'deleteUser',
    description: 'Delete a user',
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The global id of the user. Required',
        },
    },
    mutateAndGetPayload: ({ id }) => {
        const { id: _id } = fromGlobalId(id);
        return User.deleteOne({ _id })
            .then(({ n: wasDeleted }) => {
                if (wasDeleted) {
                    return Task.deleteOne({ userId: _id });
                }
                throw new Error(`User with id ${_id} not found`);
            })
            .catch((e) => {
                throw new Error(`Error deleting user: ${e.message}`);
            });
    },
});


module.exports = {
    addUser,
    editUser,
    deleteUser,
};
