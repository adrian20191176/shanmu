const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();

app.use(authenticateToken);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1].replaceAll('"', '');
  if (!token) {
    return res.status(401).send('you need to login to continue');
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      console.log(err.message);
      if (err.message == 'jwt expired') {
        res.status(403).send('token expired');
      } else {
        return res.status(403).send('tampered signatured', err.message);
      }
    }
    req.user = data;
    console.log('verification succesful');
    next();
  })
}

module.exports = authenticateToken;