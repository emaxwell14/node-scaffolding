const mongoose = require('mongoose');

const dbName = process.env.DB_NAME || 'node-scaffolding';

module.exports = {
    init,
};

function init() {
    mongoose.promise = global.Promise;
    mongoose.connect(`mongodb://localhost/${dbName}`)
        .then(() =>
            console.log('Connected to MongoDB successfully!'),
        )
        .catch((err) => {
            console.log('MongoDB connection error!');
            throw err;
        });
}
