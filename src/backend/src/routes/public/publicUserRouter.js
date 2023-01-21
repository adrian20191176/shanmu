const express = require('express');
const bcrypt = require('bcrypt');
const publicUserRouter = express.Router();
publicUserRouter.use(express.json());
publicUserRouter.use(express.urlencoded({ extended: false}))

const User = require('../../models/User');

async function postData(req,res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.collection.insertOne({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: 'student',
      dateJoined: req.body.dateJoined,
      categories: req.body.categories,
      about: req.body.about,
      isBlocked: false,
      reportCount: 0,
      noOfQuestionsAnswered: 0,
      profilePic: req.body.profilePic
    })
    .then(() => console.log('sucesss'))
    .catch(err => console.log(err));
    res.status(201).send('User created successfully');
  } catch(err) {
    console.log(err);
    res.status(500).send('Request failed, unable to create, something went wrong in the server');
  }
}

publicUserRouter.post('/signup', (req, res) => {
  console.log('public user');
  postData(req,res);
});

module.exports = publicUserRouter;