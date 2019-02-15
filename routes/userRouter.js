const userRouter = require('express').Router();
const {
  sendUsers,
  sendNewUser,
  sendUserByUsername
} = require('../controllers/users');
const { handle405 } = require('../errors');

userRouter
  .route('/')
  .get(sendUsers)
  .post(sendNewUser)
  .all(handle405);

userRouter
  .route('/:username')
  .get(sendUserByUsername)
  .all(handle405);

module.exports = userRouter;
