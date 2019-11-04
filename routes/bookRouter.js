const express = require('express');

function routes(Book){
  const bookRouter = express.Router();

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

  // Middleware
  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if(err) {
        return res.send(err);
      }
      if (book) {
        req.book = book
        return next();
      }
      return res.sendStatus(404);
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

  return bookRouter;
}

module.exports = routes;