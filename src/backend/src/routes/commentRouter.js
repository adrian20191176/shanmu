const express = require('express');
const commentRouter = express.Router();
commentRouter.use(express.json());
commentRouter.use(express.urlencoded({ extended: false}))

const Question = require('../models/Question');
const Answer = require('../models/Answer')
const User = require('../models/User');
const Comment = require('../models/Comment');


//api for post method

async function postData(req,res) {
  try {
    let newComment = '';
    await Comment.collection.insertOne({
      date: req.body.date,
      description: req.body.description,
      user: req.body.userId,
      answer: req.body.answerId,
      question: req.body.questionId
    })
    .then((res) => {
      newComment = res.insertedId;
    })
    .catch(err => console.log(err));

    let answer = await Answer.findById(req.body.answerId);
    if (typeof answer.comments === 'undefined') {
      answer = {
        ...answer,
        comments: []
      }
    }
    const value = newComment.valueOf()
    answer.comments.push(value);
    const updateComment = {
      "comments": answer.comments
    }

    const updateAnswer = await Answer.findByIdAndUpdate(req.body.answerId,  updateComment);
    if (updateAnswer) {
      res.status(201).send('Comment created successfully');
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
    const { questionId, userId, answerId, commentId } = req.body;

    const user = await User.findById(userId);
    const comment = await Comment.findById(commentId).populate('user');

    if (comment) { 
      const userOwnerId = comment.user.id;

      if (userOwnerId === userId) {

        const updateComment = await Comment.findByIdAndUpdate(commentId , req.body, {
          new: true
        })

        console.log('the update answer is ', updateComment);
        if (updateComment) {
          return res.status(200).send(`Comment updated using user ID ${userId}`);
        } else {
          console.log('error in updating');
          return res.status(500).send('Sorry could not update the comment');
        }

      } else {
        return res.status(403).send('You are now allowed to update this comment');
      }

    } else {
      return res.status(404).send('Comment does not exist');
    }

  } catch(err) {
    res.status(500).send('Request failed, something went wrong in the server');
    console.log(err);
  }
}


async function deleteData(req, res) {
  try {

    const { questionId, userId, answerId, commentId } = req.body;

    const user = await User.findById(userId);
    const comment = await Comment.findById(commentId).populate('user');

    if (comment) {
      const role = user.role;
      const userOwnerId = comment.user.id;

      if (role === 'admin' || userOwnerId === userId) {
        const delComment = await Comment.deleteOne({ _id: commentId });
        
        if (delComment) {
          
          let answer = await Answer.findById(answerId);
          answer.comments.filter(comment => comment._id !== commentId);
          const updateComment = {
            "comments": answer.comments
          }
      
          const updateAnswer = await Answer.findByIdAndUpdate(answerId,  updateComment);
          if (updateAnswer) {
            return res.status(200).send(`Comment deleted by ${role} using user ID ${userId}`);
          } else {
            return res.status(400).send('bad request, kindly check req');
          }

        } else {
          console.log('error in deleting');
          return res.status(500).send('Sorry could not delete the comment');
        }
        
      } else {
        return res.status(403).send('You are now allowed to delete this comment');
      }
    } else {
      return res.status(404).send('comment does not exist');
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong in server');
  }
}

// handling routes for comment

commentRouter.post('/comment', (req, res) => {
  postData(req,res);
})

commentRouter.patch('/comment', (req, res) => {
  updateData(req,res);
})

commentRouter.delete('/comment', (req, res) => {
  deleteData(req,res);
})

module.exports = commentRouter;