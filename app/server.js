
const express = require('express');
const app = express();
const router = express.Router();
const port = 8080;


// Define middleware
router.use((req, res, next) => {
  console.log('Request Received');
  next();
});


// Define route
router.get('/', (req, res) => {
  // throw new Error('Error Thrown'); // Testing error handler
  res.send('Hello from express')
});

// Error handler must be final use() and after routes
router.use((err, req, res, next) => {
  console.log('Error handler: ', err);
  res.status(500).send('Server Error');
});


// Add route in app
app.use('/', router);

// Start server
app.listen(port, (err) => {
  if (err) {
    return console.log('App Error: ', err);
  }
  console.log(`server is listening on ${port}`);
});
