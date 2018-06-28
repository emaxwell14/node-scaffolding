const { connectionDefinitions } = require('graphql-relay');
const UserType = require('./UserType');

const { connectionType } = connectionDefinitions({ nodeType: UserType });

module.exports = connectionType;
