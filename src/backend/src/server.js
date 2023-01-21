const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const dbURL = `mongodb+srv://stackSquad:${process.env.DBPS}@selfed.h7g1j8e.mongodb.net/selfEd?retryWrites=true&w=majority`; 

//connecting database
mongoose.connect(dbURL).then(() => console.log('database connected')).catch(e => console.log('error in connecting db', e));

//checking the database connection
const connection = mongoose.connection;
connection.once('open', () => console.log('connection successful'));

//importing middlewares
const corsIssue = require('./middleware/corsIssue');
const authenticateToken = require('./middleware/authenticateToken');
const logger = require('./middleware/logger');


//public routes
const publicQuestionRouter = require('./routes/public/publicQuestionRouter');
app.use(corsIssue, logger, publicQuestionRouter);

const publicUserRouter = require('./routes/public/publicUserRouter');
app.use(corsIssue, logger, publicUserRouter);


//handling actual routes
const authRouter = require('./routes/authRouter');
app.use(corsIssue, logger, authRouter);

const questionRouter = require('./routes/questionRouter');
app.use(corsIssue, authenticateToken, logger, questionRouter);

const answerRouter = require('./routes/answerRouter');
app.use(corsIssue, authenticateToken, logger, answerRouter);

const commentRouter = require('./routes/commentRouter');
app.use(corsIssue, authenticateToken, logger, commentRouter);

const reportRouter = require('./routes/reportRouter');
app.use(corsIssue, authenticateToken, logger, reportRouter);

const userRouter = require('./routes/userRouter');
app.use(corsIssue, authenticateToken, logger, userRouter);

const port = process.env.PORT || 5000

app.listen(port);