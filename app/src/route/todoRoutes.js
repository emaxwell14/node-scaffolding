const express = require('express');
const Todo = require('../model/Todo');
const todoService = require('../service/todoService');

module.exports = {
  getRouter,
};

// TODO add joi schema and create method to handle response
function getRouter() {
  const router = express.Router();

  router.get('/tasks', todoService.getAll);
  router.post('/tasks', todoService.create);

  router.route('/tasks/:taskId')
    .get(todoService.getOne)
    .put(todoService.update)
    .delete(todoService.remove);
  
  return router;
};
