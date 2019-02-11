const connection = require('../db/connection');

exports.getApiEndpoints = () => {
  return connection;
};
