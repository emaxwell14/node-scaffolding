const taskQuery = require('./query');
const taskMutation = require('./mutation');
const connection = require('./connection');
const TaskType = require('./TaskType');

module.exports = { taskQuery, taskMutation, connection, TaskType };
