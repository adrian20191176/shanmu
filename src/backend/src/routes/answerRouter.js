const express = require('express');
const answerRouter = express.Router();
answerRouter.use(express.json());
answerRouter.use(express.urlencoded({ extended: false}))

const Question = require('../models/Question');
const Answer = require('../models/Answer')
const User = require('../models/User');


//api for post method

async function postData(req,res) {
  try {
    let newAnswer = '';
    await Answer.collection.insertOne({
      date: req.body.date,
      description: req.body.description,
      user: req.body.userId,
      question: req.body.questionId,
      vote: 0
    })
    .then((res) => {
      newAnswer = res.insertedId;
    })
    .catch(err => console.log(err));

    let question = await Question.findById(req.body.questionId);
    if (typeof question.answers === 'undefined') {
      question = {
        ...question,
        answers: []
      }
    }
    const value = newAnswer.valueOf()
    question.answers.push(value);
    const updateAnswer = {
      "answers": question.answers
    }

    const updateQuestion = await Question.findByIdAndUpdate(req.body.questionId,  updateAnswer);
    if (updateQuestion) {
      res.status(201).send('Answer created successfully');
    } else {
      res.status(400).send('bad request, kindly check req');
    }

  } catch(err) {
    console.log(err);
    res.status(500).send('Request failed, something went wrong in the server');
  }
}

// api for updating / editing a answer

async function updateData(req,res) {
  try {
    const { questionId, userId, answerId, vote } = req.body;

    const user = await User.findById(userId);
    const answer = await Answer.findById(answerId).populate('user');

    if (answer) { 
      const userOwnerId = answer.user.id;

      if (vote && userOwnerId !== userId) {

        if (vote === 1) {
          
          const updateAnswer = await Answer.findByIdAndUpdate(answerId , { $inc: { votes: 1 } }, {
            new: true
          })
  
          if (updateAnswer) {
            return res.status(200).send(`Answer updated using user ID ${userId} ${answer}`);
          } else {
            return res.status(500).send('Sorry could not update the Answer');
          }

        } else if (vote === 2) {

          const updateAnswer = await Answer.findByIdAndUpdate(answerId , { $inc: { votes: -1 } }, {
            new: true
          })
  
          if (updateAnswer) {
            return res.status(200).send(`Answer updated using user ID ${userId}`);
          } else {
            return res.status(500).send('Sorry could not update the Answer');
          }
        }
      }  else if (userOwnerId === userId) {

        const updateAnswer = await Answer.findByIdAndUpdate(answerId , req.body, {
          new: true
        })

        console.log('the update answer is ', updateAnswer);
        if (updateAnswer) {
          return res.status(200).send(`Answer updated using user ID ${userId}`);
        } else {
          console.log('error in updating');
          return res.status(500).send('Sorry could not update the answer');
        }

      } else {
        return res.status(403).send('You are now allowed to update this answer');
      }

    } else {
      return res.status(404).send('Answer does not exist');
    }

  } catch(err) {
    res.status(500).send('Request failed, something went wrong in the server');
    console.log(err);
  }
}


async function deleteData(req, res) {
  try {

    const { questionId, userId, answerId } = req.body;

    const user = await User.findById(userId);
    const answer = await Answer.findById(answerId).populate('user');

    if (answer) {
      const role = user.role;
      const userOwnerId = answer.user.id;

      if (role === 'admin' || userOwnerId === userId) {
        const delAnswer = await Answer.deleteOne({ _id: answerId });
        
        if (delAnswer) {
          
          let question = await Question.findById(questionId);

          question.answers.filter(answer => answer._id !== answerId);
          const updateAnswer = {
            "answers": question.answers
          }
      
          const updateQuestion = await Question.findByIdAndUpdate(req.body.questionId,  updateAnswer);
          if (updateQuestion) {
            return res.status(200).send(`Answer deleted by ${role} using user ID ${userId}`);
          } else {
            return res.status(400).send('bad request, kindly check req');
          }

        } else {
          console.log('error in deleting');
          return res.status(500).send('Sorry could not delete the answer');
        }
        
      } else {
        return res.status(403).send('You are now allowed to delete this Answer');
      }
    } else {
      return res.status(404).send('Answer does not exist');
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong in server');
  }
}

// handling routes for answer

answerRouter.post('/answer', (req, res) => {
  postData(req,res);
})

answerRouter.patch('/answer', (req, res) => {
  updateData(req,res);
})

answerRouter.delete('/answer', (req, res) => {
  deleteData(req,res);
})

module.exports = answerRouter;