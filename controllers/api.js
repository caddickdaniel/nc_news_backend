const { endpoints } = require('../models/api');

exports.sendApiEndpoints = (req, res, next) => {
  res.status(200).send({ endpoints });
};
