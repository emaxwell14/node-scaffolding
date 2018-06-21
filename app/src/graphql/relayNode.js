
const { nodeDefinitions, fromGlobalId } = require('graphql-relay');
const Task = require('../model/Todo');

const { nodeInterface, nodeField: node, nodesField: nodes } = nodeDefinitions(
    (globalId) => {
        // TODO handle global id
        const { type, id: _id } = fromGlobalId(globalId);

        switch (type) {
            case 'task':
                return Task.findById({ _id });
            default:
                return null;
        }
    },
    (obj) => {
        switch (getType(obj)) {
            /* eslint-disable global-require */
            case 'Task':
                return require('./TaskType');
            default:
                return null;
            /* eslint-enable */
        }
    },
);

module.exports = { nodeInterface, node, nodes };

function getType(obj) {
    // eslint-disable-next-line no-underscore-dangle
    return obj ? obj.__type : undefined;
}