const { GraphQLNonNull } = require('graphql/type');
const { fromGlobalId } = require('graphql-relay');
const AddUserInput = require('./AddUserInput');
const EditTaskInput = require('./EditUserInput');
const UserPayload = require('./UserPayload');
const { User } = require('../../model');

const addUser = {
    type: UserPayload,
    description: 'Add a user',
    args: {
        input: {
            type: new GraphQLNonNull(AddUserInput),
        },
    },
    resolve: (_, { input: { name, email, password, clientMutationId } }) => {
        const createdUser = new User({ name, email, password });

        return User.create(createdUser).then(user => ({
            clientMutationId,
            user,
        })).catch(() => {
            throw new Error('Error creating user');
        });
    },
};

const editUser = {
    type: UserPayload,
    description: 'Edit a user',
    args: {
        input: {
            type: new GraphQLNonNull(EditTaskInput),
        },
    },
    resolve: (_, { input: { id, name, description, status, clientMutationId } }) => {
        const { id: _id } = fromGlobalId(id);
        const userToEdit = new User({ _id, name, description, status });

        return User.findOneAndUpdate({ _id }, userToEdit, { new: true }).then(user => ({
            clientMutationId,
            user,
        })).catch(() => {
            throw new Error('Error editing user');
        });
    },
};


module.exports = {
    addUser,
    editUser,
};
