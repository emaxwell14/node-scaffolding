
module.exports = {
    getServerPort,
    getLogLevel,
    getEnvironment,
    getDatabaseName,
};


function getLogLevel() {
    return process.env.LOG_LEVEL || 'debug';
}

function getServerPort() {
    return parseInt(process.env.SERVER_PORT, 10) || 8080;
}

function getEnvironment() {
    return process.env.NODE_ENV || 'dev';
}
function getDatabaseName() {
    return process.env.DB_NAME || 'node-scaffolding';
}
