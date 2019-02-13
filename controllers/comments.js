const { updateComment, deleteCommentByID } = require('../models/comments');

exports.sendUpdatedComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  updateComment(comment_id, inc_votes)
    .then(([comment]) => res.status(200).send({ comment }))
    .catch(err => console.log(err) || next(err));
};

exports.sendDeletedComment = (req, res, next) => {
  const { article_id } = req.params;

  deleteCommentByID(article_id)
    .then(() => res.sendStatus(204))
    .catch(err => console.log(err) || next(err));
};
