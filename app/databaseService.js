/* eslint-disable no-console */
const mongoose = require('mongoose');
const { logger } = require('./src/utils');
const configurationService = require('./src/service/configurationService');

function init() {
    const isProd = configurationService.getEnvironment() === 'dev';
    const dbName = configurationService.getDatabaseName();

    mongoose.promise = global.Promise;
    mongoose.set('debug', !isProd);
    mongoose.connect(`mongodb://localhost/${dbName}`)
        .then(() =>
            logger.info('Connected to MongoDB successfully!'),
        )
        .catch((err) => {
            logger.error('MongoDB connection error!');
            throw err;
        });
}

module.exports = {
    init,
};
