const commentRouter = require('express').Router();
const { sendUpdatedComment, sendDeletedComment } = require('../controllers/comments');
const { handle405 } = require('../errors');

commentRouter
  .route('/:comment_id')
  .patch(sendUpdatedComment)
  .delete(sendDeletedComment)
  .all(handle405);

module.exports = commentRouter;
