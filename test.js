const mongoose = require("mongoose");
const Book = require("./model");

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");
const should = chai.should();

chai.use(chaiHttp);

describe("/POST book", () => {
  it("it should not POST a book without pages field", (done) => {
    const book = {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      year: 1954,
    };
    chai
      .request(server)
      .post("/book")
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errors");
        res.body.errors.should.have.property("pages");
        res.body.errors.pages.should.have.property("kind").eql("required");
        done();
      });
  });
  it("it should not POST a book without title field", (done) => {
    const book = {
      author: "J.R.R. Tolkien",
      year: 1954,
      pages: 1190,
    };
    chai
      .request(server)
      .post("/book")
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errors");
        res.body.errors.should.have.property("title");
        res.body.errors.pages.should.have.property("kind").eql("required");
        done();
      });
  });
  it("it should POST a book ", (done) => {
    const book = {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      year: 1954,
      pages: 1170,
    };
    chai
      .request(server)
      .post("/book")
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Book successfully added!");
        res.body.book.should.have.property("title");
        res.body.book.should.have.property("author");
        res.body.book.should.have.property("pages");
        res.body.book.should.have.property("year");
        done();
      });
  });
});
