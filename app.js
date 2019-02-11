const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err, '<<<<');
  //if (err.code === 23505) return Promise.reject({status: 422, message: 'Sorry, the key you have entered already exists'})
  //22P02 - err.code for invalid syntax, expected integer, got string

  // if (err.status === 404) {
  //   res.status(404).json({
  //     message:
  //       'Sorry, the page you have entered does not exist. Please try again'
  //   });
  // }
  // if (err.status === 400) {
  //   res.status(400).json({
  //     message:
  //       'Sorry, an incorrect format has been detected. Ensure you have typed in the correct format and try again'
  //   });
  // }
  // if (err.status === 422) {
  //   res
  //     .status(422)
  //     .json({ message: 'Sorry, the key you have entered already exists. Please try again' });
  // } else
  res.status(500).send({ message: 'Oops! Something went wrong' });
});

module.exports = app;
