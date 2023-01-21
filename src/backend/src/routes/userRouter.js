const express = require('express');
const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: false}))

const User = require('../models/User');

async function retrieveData(req, res) {
  try {
    const data = await User.find({});
    if (data.length !== 0 || data !== null) {
      res.status(200).json(data);
    } else {
      res.status(500).send('sorry something wrong');
    }
  } catch (err) {
    res.status(500).send('something went wrong in server');
  }
}

async function retrieveSpecific(req, res) {
  try {
    const queryId = {}
    if (req.query.id) {
      queryId._id = req.query.id;
    }

    const user = await User.find(queryId);
    const test = JSON.stringify(user);
    const parsed = JSON.parse(test)

    if (user.length !== 0 || typeof user !== null) {
      res.status(200).json(user);
    } else {
      res.status(500).send('sorry something wrong');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong in server');
  }
}



// api for updating / editing a question

async function updateUser(req,res) {
  try {
    const { userId, senderId , isBlocked } = req.body;

    const user = await User.findById(userId);

    if (user) { 
      const userOwnerId = user.id;

      const sender = await User.findById(senderId);
      if (isBlocked) {
        if (sender.role === 'admin') {
          const updateUser = await User.findByIdAndUpdate(userId , {
            isBlock: true
          }, {
            new: true
          })
  
          if (updateUser) {
            console.log('successfully updated');
            return res.status(200).send(`User updated using admin user ID ${userId}`);
          } else {
            console.log('error in updating');
            return res.status(500).send('Sorry could not update the user');
          }
        } else {
          return res.status(403).send('You are now allowed to block this User');
        }
      } else if (userOwnerId === senderId || sender.role == 'admin') {
          const updateUser = await User.findByIdAndUpdate(userId , req.body, {
            new: true
          })

          if (updateUser) {
            console.log('successfully updated');
            return res.status(200).send(`User updated using user ID ${userId}`);
          } else {
            console.log('error in updating');
            return res.status(500).send('Sorry could not update the user');
          }

      } else {
        return res.status(403).send('You are now allowed to update this User');
      }

    } else {
      return res.status(404).send('User does not exist');
    }

  } catch(err) {
    res.status(500).send('Request failed, something went wrong in the server');
    console.log(err);
  }
}

async function deleteUser(req, res) {
  try {

    const senderId = req.query.sid;
    const userId = req.query.uid;


    const user = await User.findById(userId);
    const sender = await User.findById(senderId);

    if (user) {

      if (sender.role === 'admin' || senderId === userId) {
        const delUser = await User.deleteOne({ _id: userId });
        
        if (delUser) {
          console.log('successfully deleted', delUser);
          return res.status(200).send(`User deleted using user ID ${userId}`);
        } else {
          console.log('error in deleting');
          return res.status(500).send('Sorry could not delete the user');
        }
        
      } else {
        return res.status(403).send('You are now allowed to delete this user');
      }
    } else {
      return res.status(404).send('User does not exist');
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong in server');
  }
}


// handling routes for user
userRouter.get('/user', (req,res) => {
  if (req.query.id) {
    console.log('specific');
    retrieveSpecific(req, res);
  } else {
    console.log('all');
    retrieveData(req,res);
  }
});

userRouter.patch('/user', (req, res) => {
  updateUser(req, res);
});

userRouter.delete('/user', (req, res) => {
  deleteUser(req, res);
})


module.exports = userRouter;