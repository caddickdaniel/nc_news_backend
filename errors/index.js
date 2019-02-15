//ERROR HANDLING FUNCTIONS

// const app = require('../app');

// exports.handle404((err, req, res, next) => {
//   if (err.status === 404) return res.status(404).send({ message: err.message });
//   else next(err);
//   //<<<< err.message references the pre written message from knex
// });

exports.handle400 = (err, req, res, next) => {
  console.log('HELOOOOOOO');
  if (err.code === '42703' || '22P02') {
    res.status(400).json({
      message:
        'Sorry, an incorrect format has been detected. Ensure you have typed in the correct format and try again'
    });
  }
};
