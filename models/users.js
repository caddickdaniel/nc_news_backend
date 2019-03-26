const connection = require('../db/connection');

exports.getUsers = () => connection('users').select('*');

exports.addUser = userObj => connection('users')
  .insert(userObj)
  .returning('*');

exports.getUsersByUsername = username => connection('users')
  .select('*')
  .where('users.username', '=', username);
