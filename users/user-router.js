const express = require('express');
const userAuth =require('../auth/userAuth')
const Users = require('./user-model');

const router = express.Router({
    mergeParams: true,
});

// GET all users
router.get('/', userAuth, (req, res) =>{
    Users.find()
    .then(users =>{
        res.json(users);
    })
    .catch(err =>{
        res.status(500).json({
            message: 'Failed to get users'
        });
    });
});


// GET User by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Users.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ 
            message: 'Could not find user with given id.'
         })
      }
    })
     //  Error handling needs to be reviewed
    .catch(err => {
      res.status(500).json({ message: 'Failed to get users' });
    });
  });

router.post('/', (req, res) => {
  const userData = req.body;

  Users.add(userData)
  .then(user => {
    res.status(201).json(user);
  })
  .catch (err => {
    res.status(500).json({
         message: 'Failed to create new user'
         });
  });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Users.findById(id)
    .then(user => {
      if (user) {
        Users.update(changes, id)
        .then(updatedUser => {
          res.json(updatedUser);
        });
        // Need to check error handling
      } else {
        res.status(404).json({
             message: 'Could not find user with given id' 
            });
      }
    })
    .catch (err => {
      res.status(500).json({
           message: 'Failed to update user' 
        });
    });
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({
             message: 'Could not find user with given id' 
            });
      }
    })
    .catch(err => {
      res.status(500).json({
           message: 'Failed to delete user' 
        });
    });
  });


module.exports = router;