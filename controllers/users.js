const { getUsers, addUser, getUsersByUsername } = require('../models/users');

exports.sendUsers = (req, res, next) => {
  const userObj = req.body;

  getUsers(userObj)
    .then(users => res.status(200).send({ users }))
    .catch(err => next(err));
};

exports.sendNewUser = (req, res, next) => {
  const userObj = req.body;

  addUser(userObj)
    .then(([user]) => res.status(201).send({ user }))
    .catch(err => next(err));
};

exports.sendUserByUsername = (req, res, next) => {
  const { username } = req.params;

  getUsersByUsername(username)
    .then(([user]) => res.status(200).send({ user }))
    .catch(err => next(err));
};
