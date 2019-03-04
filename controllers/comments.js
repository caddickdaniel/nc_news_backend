const { updateComment, deleteCommentByID } = require('../models/comments');

exports.sendUpdatedComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  updateComment(comment_id, inc_votes)
    .then(([comment]) => {
      if (typeof inc_votes !== 'number')
        return Promise.reject({
          status: 400,
          message: 'Malformed syntax, check you have entered a Number'
        });
      if (!comment_id)
        return Promise.reject({
          status: 404,
          message: 'Comment ID doesnt exist'
        });
      res.status(200).send({ comment });
    })
    .catch(err => next(err));
};

exports.sendDeletedComment = (req, res, next) => {
  const { comment_id } = req.params;

  deleteCommentByID(comment_id)
    .then(response => {
      if (!response)
        return Promise.reject({
          status: 404,
          message: 'Comment ID doesnt exist'
        });
      res.sendStatus(204);
    })
    .catch(err => next(err));
};
