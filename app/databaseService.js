/* eslint-disable no-console */
const mongoose = require('mongoose');
const chalk = require('chalk');

const dbName = process.env.DB_NAME || 'node-scaffolding';

module.exports = {
    init,
};

function init() {
    mongoose.promise = global.Promise;
    const isProd = process.env.ENVIRONMENT === 'PROD';
    mongoose.set('debug', !isProd);
    mongoose.connect(`mongodb://localhost/${dbName}`)
        .then(() =>
            console.log(chalk.blue('Connected to MongoDB successfully!')),
        )
        .catch((err) => {
            console.log(chalk.red('MongoDB connection error!'));
            throw err;
        });
}
