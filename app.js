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

const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
const Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Books route
bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);

    book.save();
    return res.status(201).json(book);
  })
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre
    }
    Book.find(query, (err, books) => {
      if(err) {
        return res.send(err);
      }
      return res.json(books); 
    });
  });

// Route with book identifier
bookRouter.route('/books/:bookId')
  .get((req, res) => {

    Book.findById(req.params.bookId, (err, book) => {
      if(err) {
        return res.send(err);
      }
      return res.json(book); 
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
