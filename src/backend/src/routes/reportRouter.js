const express = require('express');
const reportRouter = express.Router();
reportRouter.use(express.json());
reportRouter.use(express.urlencoded({ extended: false}))

const Report = require('../models/Report');
const User = require('../models/User');


//api for post
 function postData(req,res) {
  // try {
  //   await Report.collection.insertOne({
  //     type: req.body.type,
  //     description: req.body.description,
  //     date: req.body.date,
  //     user: req.body.userId,
  //     reporter: req.body.reporterId,
  //     isOpen: true,
  //     question: req.body.questionId,
  //     answer: req.body.answerId,
  //     comment: req.body.commentId
  //   })
  //   .then(() => {

  //     const updateUser =  User.findByIdAndUpdate(req.body.userId , { $inc: { reportCount: 1 } }, {
  //       new: true
  //     });

  //     if (updateUser) {
  //       console.log('post and update reportcount')
  //       return res.status(201).send(`User report count & report posted updated using user ID ${req.body.reporterId}`);
  //     } else {
  //       return res.status(500).send('Sorry could not post report');
  //     }

  //   })
  //   .catch(err => console.log(err));
  //   // res.status(201).send('Report created successfully');
  // } catch(err) {
  //   res.status(500).send('Request failed, something went wrong in the server');
  // }




  try {
    const addReport = async () => {
      const reportRes = await Report.collection.insertOne({
        type: req.body.type,
        description: req.body.description,
        date: req.body.date,
        user: req.body.userId,
        reporter: req.body.reporterId,
        isOpen: true,
        question: req.body.questionId,
        answer: req.body.answerId,
        comment: req.body.commentId
      })
      
      const updateUser = await User.findByIdAndUpdate(req.body.userId , { $inc: { reportCount: 1 } }, {
        new: true
      });

      if (updateUser) {
        return res.status(201).send(`User report count & report posted updated using user ID ${req.body.reporterId}`);
      } else {
        return res.status(500).send('Sorry could not post report');
      }

    }

    addReport();

  } catch(err) {
    res.status(500).send('Request failed, something went wrong in the server');
  }
}



async function getData(req, res) {
  try {

    const queryId = {}
    if (req.query.id) {
      queryId._id = req.query.id;
    }

    const report = await Report.find(queryId).populate('user').populate('question').populate('answer').populate('comment');
    const test = JSON.stringify(report);
    const parsed = JSON.parse(test)

    if (report.length !== 0 || typeof report !== null) {
      res.status(200).json(report);
    } else {
      res.status(500).send('sorry something wrong');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong in server');
  }
}



async function updateData(req,res) {
  try {
    const { reportId, userId, isOpen } = req.body;

    const user = await User.findById(userId);
    const report = await Report.findById(reportId)

    if (report) { 
      console.log('user roel ', user.role)
      if (user.role === 'admin') {
        const updateReport = await Report.findByIdAndUpdate(reportId ,  { isOpen: isOpen }, {
          new: true
        })

        if (updateReport) {
          console.log('successfully updated');
          return res.status(200).send(`Report closed using user ID ${userId}`);
        } else {
          console.log('error in updating');
          return res.status(500).send('Sorry could not close the Report');
        }


      } 
       else {
        return res.status(403).send('You are now allowed to close this report');
      }

    } else {
      return res.status(404).send('Report does not exist');
    }

  } catch(err) {
    res.status(500).send('Request failed, something went wrong in the server');
    console.log(err);
  }
}




async function deleteData(req, res) {
  try {

    const reportId = req.query.rid;
    const userId = req.query.uid;


    const user = await User.findById(userId);
    const report = await Report.findById(reportId);

    if (report) {

      if (user.role === 'admin') {
        const delReport = await Report.deleteOne({ _id: reportId });
        
        if (delReport) {
          console.log('successfully deleted', delReport);
          return res.status(200).send(`Report deleted using user ID ${userId}`);
        } else {
          console.log('error in deleting');
          return res.status(500).send('Sorry could not delete the Report');
        }
        
      } else {
        return res.status(403).send('You are now allowed to delete this Report');
      }
    } else {
      return res.status(404).send('User does not exist');
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong in server');
  }
}







reportRouter.post('/report', (req, res) => {
  postData(req, res);
});

reportRouter.get('/report', (req, res) => {
  getData(req, res);
});

reportRouter.patch('/report', (req, res) => {
  updateData(req, res);
});

reportRouter.delete('/report', (req, res) => {
  deleteData(req, res);
})

module.exports = reportRouter;
