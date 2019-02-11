//ERROR HANDLING FUNCTIONS

const app = require('../app');

// exports.handle404((err, req, res, next) => {
//   if (err.status === 404) res.status(404).send({ message: err.message });
//   else next(err);
//   //<<<< err.message references the pre written message from
// });

// exports.handle400((err, req, res, next) => {
//   const { code } = err;
//   const errorCodes400 = {
//     '22P02': 'invalid input syntax for integer'
//   };
//   if (errorCodes400[code])
//     res.status(400).send({ message: errorCodes400[code] });
//   else next(err);
// });

// //require in your app.js ^^^^
// //app.use(handle404)
