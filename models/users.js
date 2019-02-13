const connection = require('../db/connection');

exports.getUsers = () => {
  return connection('users').select('*');
};

exports.addUser = userObj => {
  return connection('users')
    .insert(userObj)
    .returning('*');
};

exports.getUsersByUsername = username => {
  return connection('users')
    .select('*')
    .where('users.username', '=', username);
};

exports.getArticlesByUser = () => {
  return connection;
};
