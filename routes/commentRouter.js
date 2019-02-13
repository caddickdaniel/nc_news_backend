const commentRouter = require('express').Router();
const {
  sendUpdatedComment,
  sendDeletedComment
} = require('../controllers/comments');

commentRouter
  .route('/:comment_id')
  .patch(sendUpdatedComment)
  .delete(sendDeletedComment);

module.exports = commentRouter;
