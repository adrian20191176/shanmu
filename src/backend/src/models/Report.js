const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  date: Date,
  type: String,
  description: String,
  isOpen: Boolean,
  user: {
    type: String,
    ref: 'userschema'
  },
  reporter: {
    type: String,
    ref: 'userschema'
  },
  question: {
    type: String,
    ref: 'questionschemas'
  },
  answer: {
    type: String,
    ref: 'answerschema'
  },
  comment: {
    type: String,
    ref: 'commentschema'
  }
});

module.exports = mongoose.model('reportschemas', ReportSchema);