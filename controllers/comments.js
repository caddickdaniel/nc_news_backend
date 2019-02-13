const { updateComment, deleteComment } = require('../models/comments');

exports.sendUpdatedComment = () => {
  const comments = req.body;

  updateComment(comments)
    .then(([comments]) => res.status(204).send({ comments }))
    .catch(err => next(err));
};

exports.sendDeletedComment = () => {
  const comments = req.body;

  deleteComment(comments)
    .then(([comments]) => res.status(204).send({ comments }))
    .catch(err => next(err));
};
