const { GraphQLNonNull, GraphQLID, GraphQLList } = require('graphql/type');
const { fromGlobalId } = require('graphql-relay');
const { User } = require('../../model');
const UserType = require('./UserType');

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
    type: new GraphQLList(UserType),
    resolve: () => User.find()
        .catch(() => {
            throw new Error('Error searching for users');
        }),
};

module.exports = {
    user,
    users,
};
