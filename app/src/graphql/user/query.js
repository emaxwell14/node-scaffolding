const { GraphQLNonNull, GraphQLID } = require('graphql/type');
const { fromGlobalId } = require('graphql-relay');
const { User } = require('../../model/index');
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
            .catch(() => {
                throw new Error(`Error searching for user with id ${_id}`);
            });
    },
};

module.exports = {
    user,
};
