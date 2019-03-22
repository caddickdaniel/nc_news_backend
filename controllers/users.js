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
    .then(([user]) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          message: 'User doesnt exist',
        });
      }
      res.status(200).send({ user });
    })
    .catch(err => console.log(err) || next(err));
};
