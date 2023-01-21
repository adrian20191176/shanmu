const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  date: Date,
  description: String,
  user: {
    type: String,
    ref: 'userschema'
  },
  question: {
    type: String,
    ref: 'questionschema'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "commentschema"
  }],
  votes: Number
})

module.exports = mongoose.model('answerschema', AnswerSchema);