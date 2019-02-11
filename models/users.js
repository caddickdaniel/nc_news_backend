const connection = require('../db/connection');

exports.getUsers = () => {
  return connection;
};

exports.addUser = () => {
  return connection;
};

exports.getUsersByUsername = () => {
  return connection;
};

exports.getArticlesByUser = () => {
  return connection;
};
