const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const authorFields = {
    name:String,
    age: Number,
    sex:String,
    cityID: mongoose.Schema.Types.ObjectId
  };
  
  const authorSchema = new Schema(authorFields);
  
  const Author = mongoose.model('Author', authorSchema);
  if (!Author.collection.collection) {
    Author.createCollection();
  }
  module.exports = {Author, authorFields};