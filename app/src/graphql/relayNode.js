const { nodeDefinitions, fromGlobalId } = require('graphql-relay');
const { Task, User } = require('../model');

const { nodeInterface, nodeField: node, nodesField: nodes } = nodeDefinitions(
    (globalId) => {
        const { type, id: _id } = fromGlobalId(globalId);

        switch (type) {
            case 'task':
                return Task.findById({ _id });
            case 'user':
                return User.findById({ _id });
            default:
                return null;
        }
    },
    (obj) => {
        switch (getType(obj)) {
            /* eslint-disable global-require */
            case 'Task':
                return require('./task').TaskType;
            case 'User':
                return require('./user').UserType;
            default:
                return null;
            /* eslint-enable */
        }
    },
);

module.exports = { nodeInterface, node, nodes };

function getType(obj) {
    return obj ? obj.type : undefined;
}
