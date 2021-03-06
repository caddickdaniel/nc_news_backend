const connection = require('../db/connection');

exports.updateComment = (comment_id, inc_votes) => connection('comments')
  .where('comments.comment_id', '=', comment_id)
  .increment('votes', inc_votes || 0)
  .returning('*');

exports.deleteCommentByID = comment_id => connection('comments')
  .where('comments.comment_id', '=', comment_id)
  .del();
