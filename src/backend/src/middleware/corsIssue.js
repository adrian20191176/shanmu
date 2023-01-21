const express = require('express');
const corsIssue = express();
const cors = require('cors');


corsIssue.use((req,res,next) => {
  res.set('Cache-control', 'private, max-age=300')
  next();
})


corsIssue.use(
  cors({
    origin: 'http://localhost:3000',  
    credentials: true
  })
)


module.exports = corsIssue;