const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const logger = express();

logger.use((req,res,next) => {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../reqlogs/access.log'), { flags: 'a' })
  logger.use(morgan('combined', { stream: accessLogStream }))
  next();
})



module.exports = logger;