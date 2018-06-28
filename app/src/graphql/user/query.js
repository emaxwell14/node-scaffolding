const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql/type');
const { fromGlobalId, connectionArgs } = require('graphql-relay');
const { User } = require('../../model');
const UserType = require('./UserType');
const UserConnection = require('./UserConnection');
const { paginate: { getPaginatedCollection } } = require('../../utils');

const user = {
    name: 'user',
    description: 'Get user by id',
    type: UserType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve: (root, { id }) => {
        const { id: _id } = fromGlobalId(id);
        return User.findById({ _id })
            .catch((e) => {
                throw new Error(`Error searching for user with id ${_id}: ${e.message}`);
            });
    },
};

const users = {
    name: 'users',
    description: 'Get all users',
    type: UserConnection,
    args: connectionArgs,
    resolve: (root, args) =>
        getPaginatedCollection(User, {}, {}, args).catch((e) => {
            throw new Error(`Error searching for users: ${e.message}`);
        }),
};

const userLogin = {
    name: 'userLogin',
    description: 'Verify the users username/email and password',
    type: UserType,
    args: {
        userName: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name or email of the user. Requireds',
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The password of the user. Required',
        },
    },
    resolve: (root, { userName, password }) =>
        User.findOne({
            $or: [
                { name: userName },
                { email: userName },
            ],
        }).then((data) => {
            if (data === null) {
                throw new Error(`User "${userName}" not found`);
            }
            if (data.password !== password) {
                throw new Error(`Password incorrect for user "${userName}"`);
            }
            return data;
        }).catch((e) => {
            throw new Error(`Error searching for user "${userName}". ${e.message}`);
        }),
};

module.exports = {
    user,
    users,
    userLogin,
};
