const express = require('express');
const taskService = require('../service/taskService');

module.exports = {
    getRouter,
};

// TODO add joi schema and create method to handle response
function getRouter() {
    const router = express.Router();

    router.get('/tasks', taskService.getAll);
    router.post('/tasks', taskService.create);

    router.route('/tasks/:taskId')
        .get(taskService.getOne)
        .put(taskService.update)
        .delete(taskService.remove);

    return router;
}
