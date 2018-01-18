var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
  writer: String,
  date: String,
  title: String,
  director: String,
  comments: String
});

module.exports = mongoose.model('movie', movieSchema);
