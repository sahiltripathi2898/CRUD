const express = require('express');
const router = express.Router();

const User = require('../models/usermodel.js');

// Create and Save a new User
router.post('/', (req, res) => {
  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
  });

  // Save user in the database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.',
      });
    });
});

// Retrieve and return all user from the database.
router.get('/', (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving user.',
      });
    });
});

// Find a single user with a id
router.get('/:userID', (req, res) => {
  User.findById(req.params.userID)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userID,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userID,
        });
      }
      return res.status(500).send({
        message: 'Error retrieving user with id ' + req.params.userID,
      });
    });
});

// Find user and update it with the request body
router.put('/:userID', (req, res) => {
  User.findByIdAndUpdate(req.params.userID, {
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userID,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userID,
        });
      }
      return res.status(500).send({
        message: 'Error updating note with id ' + req.params.userID,
      });
    });
});

// Delete a note with the specified userID in the request
router.delete('/:userID', (req, res) => {
  User.findByIdAndRemove(req.params.userID)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userID,
        });
      }
      res.send({ message: 'User deleted successfully!' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userID,
        });
      }
      return res.status(500).send({
        message: 'Could not delete user with id ' + req.params.userID,
      });
    });
});

module.exports = router;
