const userRouter = require('express').Router();
const { sendUsers, sendNewUser } = require('../controllers/users');

userRouter
  .route('/')
  .get(sendUsers)
  .post(sendNewUser);

module.exports = userRouter;
