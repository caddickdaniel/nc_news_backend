// const { getShopOwners, getShops, getTreasure } = require('../models/shops');

// exports.sendOwners = (req, res, next) => {
//   const {
//     maxLimit,
//     sort,
//     by,
//     maxAge,
//     minAge,
//     exactAge,
//     forename,
//     surname
//   } = req.query;
//   getShopOwners(maxLimit, sort, by, maxAge, minAge, exactAge, forename, surname)
//     .then(owners => res.status(200).send({ owners }))
//     .catch(err => next(err));
//   // console.log(err);
// };

// exports.sendShops = (req, res, next) => {
//   const { maxLimit, sort, by } = req.query;
//   getShops(maxLimit, sort, by)
//     .then(shops => res.status(200).send({ shops }))
//     .catch(err => next(err));
// };

// exports.sendTreasure = (req, res, next) => {
//   getTreasure()
//     .then(treasure => res.status(200).send({ treasure }))
//     .catch(err => next(err));
// };
