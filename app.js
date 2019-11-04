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
mongoose.connect(connStr, options, function(err) {
  if (err) throw err;
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
