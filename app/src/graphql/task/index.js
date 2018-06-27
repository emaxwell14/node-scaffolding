const taskQuery = require('./query');
const taskMutation = require('./mutation');
const TaskType = require('./TaskType');
const TaskConnection = require('./TaskConnection');

module.exports = { taskQuery, taskMutation, TaskType, TaskConnection };
