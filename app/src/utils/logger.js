
const bunyan = require('bunyan');
const configurationService = require('../service/configurationService');

const log = bunyan.createLogger({
    name: 'node-scaffolding',
    serializers: bunyan.stdSerializers,
    level: configurationService.getLogLevel(),
});


module.exports = log;
