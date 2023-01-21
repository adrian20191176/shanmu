const express = require('express');
const questionRouter = express.Router();
questionRouter.use(express.json());
questionRouter.use(express.urlencoded({ extended: false}))

const Question = require('../models/Question');
const User = require('../models/User');



//api for post method

async function postData(req,res) {
  try {
    await Question.collection.insertOne({
      category: req.body.category,
      subCategory: req.body.subCategory,
      date: req.body.date,
      title: req.body.title,
      description: req.body.description,
      votes: 0,
      user: req.body.user,
      isOpen: true,
      tags: req.body.tags,
      img: req.body.img
    })
    .then(() => console.log('sucesss'))
    .catch(err => console.log(err));
    res.status(201).send('Question created successfully');
  } catch(err) {
    res.status(500).send('Request failed, something went wrong in the server');
  }
}

// api for updating / editing a question

async function updateData(req,res) {
  try {
    const { questionId, userId, vote } = req.body;

    const user = await User.findById(userId);
    const question = await Question.findById(questionId).populate('user');

    if (question) { 
      const userOwnerId = question.user.id;
      if (vote && userOwnerId !== userId) {

        if (vote === 1) {
          
          const updateQuestion = await Question.findByIdAndUpdate(questionId , { $inc: { votes: 1 } }, {
            new: true
          })
  
          if (updateQuestion) {
            return res.status(200).send(`Question updated using user ID ${userId}`);
          } else {
            return res.status(500).send('Sorry could not update the question');
          }

        } else if (vote === 2) {

          const updateQuestion = await Question.findByIdAndUpdate(questionId , { $inc: { votes: -1 } }, {
            new: true
          })
  
          if (updateQuestion) {
            return res.status(200).send(`Question updated using user ID ${userId}`);
          } else {
            return res.status(500).send('Sorry could not update the question');
          }
        }
      } else if (userOwnerId === userId || user.role === 'admin' ) {
        const updateQuestion = await Question.findByIdAndUpdate(questionId , req.body, {
          new: true
        })

        if (updateQuestion) {
          console.log('successfully updated');
          return res.status(200).send(`Question updated using user ID ${userId}`);
        } else {
          console.log('error in updating');
          return res.status(500).send('Sorry could not update the question');
        }

      }
       else {
        return res.status(403).send('You are now allowed to update this question');
      }

    } else {
      return res.status(404).send('Question does not exist');
    }

  } catch(err) {
    res.status(500).send('Request failed, something went wrong in the server');
    console.log(err);
  }
}



//api for delete all method - not in use

async function flushAll(req, res) {
  try {
    await Question.deleteMany({});
    res.status(204).send('All questions are flushed out');
    
  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong in server');
  }
}

//api for delete

async function deleteData(req, res) {
  try {

    console.log('req got for del question ', req.query);
    const questionId = req.query.qid;
    const userId = req.query.uid;


    const user = await User.findById(userId);
    const question = await Question.findById(questionId).populate('user');

    if (question) {
      const role = user.role;
      const userOwnerId = question.user && question.user.id;

      if (role === 'admin' || userOwnerId === userId) {
        const delQuestion = await Question.deleteOne({ _id: questionId });
        
        if (delQuestion) {
          console.log('successfully deleted', delQuestion);
          return res.status(200).send(`Question deleted by ${role} using user ID ${userId}`);
        } else {
          console.log('error in deleting');
          return res.status(500).send('Sorry could not delete the question');
        }
        
      } else {
        return res.status(403).send('You are now allowed to delete this question');
      }
    } else {
      return res.status(404).send('Question does not exist');
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong in server');
  }
}

// handling routes for question

questionRouter.post('/question', (req, res) => {
  postData(req,res);
})

questionRouter.patch('/question', (req, res) => {
  updateData(req,res);
})

questionRouter.delete('/question', (req, res) => {
  deleteData(req,res);
})

module.exports = questionRouter;