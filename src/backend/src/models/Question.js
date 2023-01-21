const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  category: String,
  subCategory: String,
  date: Date,
  title: String,
  description: String,
  user: {
    type: String,
    ref: 'userschema'
  },
  img: String,
  tags: [{type: String}],
  answers: [{
    type: String,
    ref: 'answerschema',
    comments: [{
      type: String,
      ref: 'commentschema'
    }]
  }],
  isOpen: Boolean,
  votes: Number
})

module.exports = mongoose.model('questionschemas', QuestionSchema);