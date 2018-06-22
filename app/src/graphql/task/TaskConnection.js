const { connectionDefinitions } = require('graphql-relay');
const TaskType = require('./TaskType');

const { connectionType } = connectionDefinitions({ nodeType: TaskType });

module.exports = connectionType;
