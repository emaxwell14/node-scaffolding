const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the name of the user',
    },
    email: {
        type: String,
        required: 'Please enter the email of the user',
    },
    password: {
        type: String,
        required: 'Please enter the password of the user',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    // Used for graphql node query
    type: {
        type: String,
        default: 'User',
    },
});

module.exports = mongoose.model('Users', UserSchema);
