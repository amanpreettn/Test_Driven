const mongoose = require("mongoose");
const Book = require("./model");

const postBook=(req, res)=> {
  var newBook = new Book(req.body);
  newBook.save((err, book) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Book successfully added!", book });
    }
  });
}

module.exports={postBook}