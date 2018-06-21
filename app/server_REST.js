/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const dbService = require('./databaseService');
const api = require('./src/route/index');
require('mongoose');
require('./src/model/index');

const app = express();
const router = express.Router();
const port = process.env.API_PORT || 8080;

// DB connection
dbService.init();

// Define middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use((req, res, next) => {
    console.log(chalk.green('Request Received with path: ', req.originalUrl));
    next();
});

// Define routes
router.use(api.getRouter());

// Error handler must be final use() and after routes
router.use((err, req, res) => {
    console.log(chalk.red('Error handler: '), err);
    res.status(500).send('Server Error');
});


// Add route in app
app.use('/', router);

// Start server
app.listen(port, (err) => {
    if (err) {
        console.log(chalk.red('Server Error: '), err);
    }
    console.log(chalk.blue(`Server is listening on ${port}`));
});
