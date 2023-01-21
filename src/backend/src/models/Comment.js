const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  date: Date,
  description: String,
  user: {
    type: String,
    ref: 'userschema'
  },
  answer: {
    type: String,
    ref: 'answerschema'
  }
})

module.exports = mongoose.model('commentschema', CommentSchema);