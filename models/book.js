const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookFields = {
    name: String,
    pages: Number,
    AuthorID: Schema.Types.ObjectId,
    ISBN: {
      country: String,
      number: String,
      code: {
        number: String,
        codeType: String
      }
    },
    categories: [{
      name: String,
      category_ID: mongoose.Schema.Types.ObjectId
    }]
  };
  
  const bookSchema = new Schema(bookFields);
  
  const Book = mongoose.model('Book', bookSchema);
  if (!Book.collection.collection) {
    Book.createCollection();
  }
  module.exports = {bookFields, Book};