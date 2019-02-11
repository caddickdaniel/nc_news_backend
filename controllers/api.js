const { getApiEndpoints } = require('../models/api');

exports.sendApiEndpoints = () => {
  const endpoints = req.body;

  getApiEndpoints(endpoints)
    .then(([endpoints]) => res.status(200).send({ endpoints }))
    .catch(err => next(err));
};
