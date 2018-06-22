const { nodeDefinitions, fromGlobalId } = require('graphql-relay');
const { Task, User } = require('../model/index');

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
                return require('./task/index').TaskType;
            case 'User':
                return require('./user/index').UserType;
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
