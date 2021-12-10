let mongoose = require("mongoose");
let Book = require("./model");

function postBook(req, res) {
  //Creates a new book
  var newBook = new Book(req.body);
  //Save it into the DB.
  newBook.save((err, book) => {
    if (err) {
      res.send(err);
    } else {
      //If no errors, send it back to the client
      res.json({ message: "Book successfully added!", book });
    }
  });
}

module.exports={postBook}