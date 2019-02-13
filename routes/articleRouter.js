const articleRouter = require('express').Router();
const {
  sendArticles,
  sendArticlesByID,
  sendNewArticle,
  sendPatchedArticle,
  sendDeletedArticle,
  sendCommentsByID,
  sendNewCommentByID
} = require('../controllers/articles');

articleRouter
  .route('/')
  .get(sendArticles)
  .post(sendNewArticle);

articleRouter
  .route('/:article_id')
  .get(sendArticlesByID)
  .patch(sendPatchedArticle)
  .delete(sendDeletedArticle);

articleRouter
  .route('/:article_id/comments')
  .get(sendCommentsByID)
  .post(sendNewCommentByID);

module.exports = articleRouter;
