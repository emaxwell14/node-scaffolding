/* eslint-disable no-console */
const mongoose = require('mongoose');
const logger = require('./src/utils/logger');
const configurationService = require('./src/service/configurationService');

const dbName = process.env.DB_NAME || 'node-scaffolding';

module.exports = {
    init,
};

function init() {
    const isProd = configurationService.getEnvironment() === 'dev';

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
