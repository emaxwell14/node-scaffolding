
module.exports = {
    getServerPort,
    getLogLevel,
    getEnvironment,
};


function getLogLevel() {
    return process.env.LOG_LEVEL || 'debug';
}

function getServerPort() {
    return parseInt(process.env.SERVER_PORT, 10) || 8080;
}

function getEnvironment() {
    return process.env.ENVIRONMENT || 'dev';
}
