const userRouter = require('express').Router();
const {
  sendUsers,
  sendNewUser,
  sendUserByUsername
} = require('../controllers/users');

userRouter
  .route('/')
  .get(sendUsers)
  .post(sendNewUser);

userRouter.route('/:username').get(sendUserByUsername);

module.exports = userRouter;
