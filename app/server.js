const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const port = 8080;

app.use(cors());


// Define middleware
router.use((req, res, next) => {
  console.log('Request Received');
  next();
});


// Define route
router.get('/', (req, res) => {
  res.send({ text: 'Hello from express'});
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
    return console.log('Server Error: ', err);
  }
  console.log(`Server is listening on ${port}`);
});
