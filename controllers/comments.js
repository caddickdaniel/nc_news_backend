const {
  getCommentsByID,
  addCommentByID,
  updateComment,
  deleteComment
} = require('../models/comments');

exports.sendCommentsByID = () => {
  const comments = req.body;

  getCommentsByID(comments)
    .then(([comments]) => res.status(200).send({ comments }))
    .catch(err => next(err));
};

exports.sendNewComment = () => {
  const comments = req.body;

  addCommentByID(comments)
    .then(([comments]) => res.status(201).send({ comments }))
    .catch(err => next(err));
};

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
