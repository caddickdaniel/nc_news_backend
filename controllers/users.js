const {
  getUsers,
  addUser,
  getUsersByUsername,
  getArticlesByUser
} = require('../models/users');

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
  const username = req.params;

  getUsersByUsername(users)
    .then(([users]) => res.status(200).send({ users }))
    .catch(err => next(err));
};

exports.sendArticleByUser = () => {
  const articles = req.body;
  const { limit, sort_by, p, order } = req.query;

  getArticlesByUser(articles, limit, sort_by, p, order)
    .then(([articles]) => res.status(200).send({ articles }))
    .catch(err => next(err));
};
