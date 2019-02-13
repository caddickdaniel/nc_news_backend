const connection = require('../db/connection');

exports.updateComment = (comment_id, inc_votes) => {
  // console.log(inc_votes);
  return connection('comments')
    .where('comments.comment_id', '=', comment_id)
    .increment('votes', inc_votes)
    .returning('*');
};

exports.deleteCommentByID = article => {
  return connection('comments')
    .where('comments.article_id', '=', article)
    .del();
};
