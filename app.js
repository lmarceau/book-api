const express = require('express');
const mongoose = require('mongoose');

// TODO: Environment variables for user and pass
// Database setup
var connStr = 'mongodb+srv://nodejs-db-iacsh.mongodb.net/NodeJS?retryWrites=true&w=majority';
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: '',
  pass: ''
};
mongoose.connect(connStr, options, function (err) {
  if (err) throw err;
});

const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
