const express = require('express');
const taskRoutes = require('./taskRoutes');

module.exports = {
    getRouter,
};

function getResult(req, res) {
    res.send({ text: 'Hello from express' });
}

function getRouter() {
    const router = express.Router();

    router.get('/', getResult);
    router.use(taskRoutes.getRouter());
    return router;
}
