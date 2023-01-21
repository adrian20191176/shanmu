const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  fullName: String,
  firstName: String,
  lastName: String,
  role: String,
  isBlocked: Boolean,
  reportCount: Number,
  dateJoined: Date,
  categories: [String],
  about: String,
  profilePic: String,
  noOfQuestionsAnswered: Number
});

module.exports = mongoose.model('userschema', UserSchema);