const commentRouter = require('express').Router();
const { sendUpdatedComment } = require('../controllers/comments');

commentRouter.route('/:comment_id').patch(sendUpdatedComment);

module.exports = commentRouter;
