const { updateComment, deleteComment } = require('../models/comments');

exports.sendUpdatedComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  updateComment(comment_id, inc_votes)
    .then(([comment]) => res.status(200).send({ comment }))
    .catch(err => console.log(err) || next(err));
};

exports.sendDeletedComment = () => {
  const comments = req.body;

  deleteComment(comments)
    .then(([comments]) => res.status(204).send({ comments }))
    .catch(err => next(err));
};
