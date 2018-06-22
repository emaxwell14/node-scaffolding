const mongoose = require('mongoose');

const Task = mongoose.model('Task');

module.exports = {
    getAll,
    create,
    getOne,
    update,
    remove,
};

function getAll(req, res) {
    Task.find({}, (err, tasks) => {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
}

function create(req, res) {
    const newTask = new Task(req.body);
    newTask.save((err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
}


function getOne(req, res) {
    Task.findById(req.params.taskId, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
}


function update(req, res) {
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
}


function remove(req, res) {
    Task.remove({ _id: req.params.taskId }, (err) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Task successfully deleted' });
    });
}
