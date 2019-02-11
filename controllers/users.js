const {
  getUsers,
  addUser,
  getUsersByUsername,
  getArticlesByUser
} = require('../models/users');

exports.sendUsers = () => {
  const users = req.body;

  getUsers(users)
    .then(([users]) => res.status(200).send({ users }))
    .catch(err => next(err));
};

exports.sendNewUser = () => {
  const users = req.body;

  addUser(users)
    .then(([users]) => res.status(201).send({ users }))
    .catch(err => next(err));
};

exports.sendUserByUsername = () => {
  const users = req.body;

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
