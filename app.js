const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');
// const { handle404, handle400 } = require('./errors/index');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res) => {
  res.status(404).send({
    message:
      'Sorry, this page was not found! Go to /api to see a list of endpoints'
  });
});

//NEED TO MOVE THE ERROR FUNCTIONALITY INTO ITS OWN FOLDER

app.use((err, req, res, next) => {
  console.log(err, '<<<<');
  if (err.code == '23505')
    res.status(422).json({
      message: 'Sorry, the value you have entered already exists'
    });
  if (err.code === '42703' || '22P02') {
    res.status(400).json({
      message:
        'Sorry, an incorrect format has been detected. Ensure you have typed in the correct format and try again'
    });
  } else if (err.status === 404) {
    return Promise.reject({
      status: 404,
      message:
        'Sorry, the page you have entered does not exist. Please try again'
    });
  } else if (err.status === 422) {
    res.status(422).json({
      message:
        'Sorry, the key you have entered already exists. Please try again'
    });
  } else res.status(500).send({ message: 'Oops! Something went wrong' });
});

// app.use(handle400);
// app.use(handle404);

module.exports = app;
