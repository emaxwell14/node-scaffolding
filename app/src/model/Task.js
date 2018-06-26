const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the name of the task',
    },
    description: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending',
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: 'Please enter the id of the user creating the task',
    },
    // Used for graphql node query
    type: {
        type: String,
        default: 'Task',
    },
});

module.exports = mongoose.model('Tasks', TaskSchema);
