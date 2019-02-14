const { getApiEndpoints } = require('../models/api');

exports.sendApiEndpoints = (req, res, next) => {
  getApiEndpoints(endpoints)
    .then(endpoints => res.status(200).send({ endpoints }))
    .catch(err => next(err));
};
