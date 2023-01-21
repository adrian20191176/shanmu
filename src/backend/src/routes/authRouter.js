const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
require('dotenv').config();


authRouter.use(express.json());
authRouter.use(cookieParser());

const User = require('../models/User');

authRouter.post('/token', (req, res) => {
  authenticateUser(req, res);
})

authRouter.get('/token', (req, res) => {
  logoutUser(req, res);
})

async function logoutUser(req, res) {
  try {
    res.clearCookie('token');
    return res.status(200).send('log out sucess')
  } catch(err) {
    res.status(500).send('something went wrong in server');
  }
}

async function authenticateUser(req, res) {
  try {
    const query = {};

    query.username = req.body.username;
 
    const user = await User.findOne(query);
    if (user == null) {
      res.status(500).send('sorry something wrong or user doesn\'t exist');
    } else {

      if (user.isBlocked === true) {
        return res.status(403).send('authentication failed user is blocked');
      } else {
        let authentication = null;
        if (req.body.password) {
          authentication = await bcrypt.compare(req.body.password, user.password);
        }
        if (authentication) {

          let token = jwt.sign({
            iss: 'http://localhost:5000',
            sub: user._id,
            aud: 'http://localhost:3000',
            name: user.username,
            role: user.role
          }, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: 86400 });
          let tokenString = JSON.stringify(token);
  
          res.cookie('token', tokenString, {
            maxAge: 86400 * 1000,
            // secure: true,
            // httpOnly: true,
            // domain: 'localhost'
            sameSite: 'Lax'
          });
  
          res.set({
            'access-control-expose-headers': 'Set-Cookie'
          })
  
          const basicUserData = {
            userId: user._id,
            username: user.username,
            dateJoined: user.dateJoined,
            role: user.role,
            categories: user.categories,
            about: user.about,
            noOfQuestionAnswered: user.noOfQuestionsAnswered,
            profilePic: user.profilePic
          }
  
          res.status(200).json(basicUserData);
        } else {
          res.status(401).send('authentication failed');
        }
      }

    }
  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong in server');
  }
}



module.exports = authRouter;