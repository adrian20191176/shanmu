const express = require('express');
const corsIssue = express();
const cors = require('cors');


corsIssue.use((req,res,next) => {
  res.set('Cache-control', 'private, max-age=300')
  next();
})


corsIssue.use(
  cors({
    origin: 'https://selfed-frontend-v0.onrender.com',  
    credentials: true
  })
)


module.exports = corsIssue;
