const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// TODO: Environment variables for user and pass
// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: '',
  pass: ''
};

// Setup connection string
let connStr = '';
if (process.env.ENV === 'Test') {
  connStr = 'mongodb+srv://npmnodejs-db-iacsh.mongodb.net/NodeJS-Test?retryWrites=true&w=majority';
} else {
  connStr = 'mongodb+srv://nodejs-db-iacsh.mongodb.net/NodeJS?retryWrites=true&w=majority';
}

// Connect to database
mongoose.connect(connStr, options, (err) => {
  if (err) throw err;
});

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.server = app.listen(port);

module.exports = app;
