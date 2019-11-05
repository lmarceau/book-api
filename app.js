const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// TODO: Environment variables for user and pass
// Connection options
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: '',
  pass: ''
};

// Setup connection string
if (process.env.ENV === 'Test') {
  var connStr = 'mongodb+srv://npmnodejs-db-iacsh.mongodb.net/NodeJS-Test?retryWrites=true&w=majority';
} else {
  var connStr = 'mongodb+srv://nodejs-db-iacsh.mongodb.net/NodeJS?retryWrites=true&w=majority';
}

// Connect to database
mongoose.connect(connStr, options, function (err) {
  if (err) throw err;
});

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;