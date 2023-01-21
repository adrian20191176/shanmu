const express = require('express');
const publicQuestionRouter = express.Router();
publicQuestionRouter.use(express.json());
publicQuestionRouter.use(express.urlencoded({ extended: false }))

const Question = require('../../models/Question');
const Answer = require('../../models/Answer');


//api for get method

async function retrieveData(req, res) {
  try {
    if (req.query.id) {
      const { id } = req.query;
      const data = await Question.findOne({ _id: id }).populate('user').populate('answers').populate({ path: 'answers', populate: { path: 'comments', path: 'user' } }).populate({ path: 'answers', populate: { path: 'comments', populate: { path: 'user' } } });
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send('Question not available maybe removed');
      }
    } else if (req.query.category) {
      const { category, page, limit } = req.query;
     
      console.log('page and limit ', page , limit, category)  
      if (page && limit) {

        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const endIndex = parseInt(page) * parseInt(limit);

        const data = await Question.find({ category: category }).populate('user').populate('answers').populate({ path: 'answers', populate: { path: 'comments', path: 'user' } }).populate({ path: 'answers', populate: { path: 'comments', populate: { path: 'user' } } }).limit(limit).skip(startIndex);
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(404).send('Question not available maybe removed');
        }
      }
      
      const data = await Question.find({ category: category }).populate('user').populate('answers').populate({ path: 'answers', populate: { path: 'comments', path: 'user' } }).populate({ path: 'answers', populate: { path: 'comments', populate: { path: 'user' } } }).limit(10);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send('Question not available maybe removed');
      }
    } else {

      const { page, limit } = req.query;

      if (page && limit) {
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const endIndex = parseInt(page) * parseInt(limit);
        console.log('page nad limit ',page, limit)

        const data = await Question.find({}).populate('user').populate('answers').populate({ path: 'answers', populate: { path: 'comments', path: 'user' } }).populate({ path: 'answers', populate: { path: 'comments', populate: { path: 'user' } } }).limit(limit).skip(startIndex);
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(404).send('Question not available maybe removed');
        }
      }
      
      const data = await Question.find({}).populate('user').populate({ path: 'answers', populate: { path: 'comments', path: 'user' } }).populate({ path: 'answers', populate: { path: 'comments', populate: { path: 'user' } } }).limit(25);
      if (data.length !== 0 || data !== null) {
        res.status(200).json(data);
      } else {  
        res.status(500).send('No question to fetch');
      }
    }

  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong in server ', err?.message);
  }
}



publicQuestionRouter.get('/question', (req, res) => {
  retrieveData(req, res);
});



module.exports = publicQuestionRouter;