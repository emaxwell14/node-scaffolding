const express = require('express');
const todoRoutes = require('./todoRoutes');

module.exports = {
    getRouter,
};

function getResult(req, res) {
    res.send({ text: 'Hello from express' });
}

function getRouter() {
    const router = express.Router();

    router.get('/', getResult);
    router.use(todoRoutes.getRouter());
    return router;
}
