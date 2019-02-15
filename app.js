const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const { handle400, handle422, handle404 } = require('./errors/index');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res) => {
  res.status(404).send({
    message:'Sorry, this page was not found! Go to /api to see a list of endpoints'
  });
});

// app.use((err, req, res, next) => {
//   // console.log(err, '<<<<');
//   if (err.code == '23505')
//     res.status(422).json({
//       message: 'Sorry, the value you have entered already exists'
//     });
//   else if (err.status === 404) {
//     return Promise.reject({
//       status: 404,
//       message:
//         'Sorry, the page you have entered does not exist. Please try again'
//     });
//   } else if (err.status === 422) {
//     res.status(422).json({
//       message:
//         'Sorry, the key you have entered already exists. Please try again'
//     });
//   } else res.status(500).send({ message: 'Oops! Something went wrong' });
// });

app.use(handle400);
// app.use(handle405);
app.use(handle422);
app.use(handle404);

// app.use(handle400);

module.exports = app;
