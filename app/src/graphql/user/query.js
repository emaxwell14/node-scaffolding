const { GraphQLNonNull, GraphQLID } = require('graphql/type');
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

module.exports = {
    user,
    users,
};
