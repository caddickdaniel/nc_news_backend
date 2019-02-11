const app = require('./app');
const port = '9090';

app.listen(port, err => {
  if (err) console.log(err);
  console.log(`Listening on ${port}`);
});
