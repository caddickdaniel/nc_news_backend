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
const { handle405 } = require('../errors');

articleRouter
  .route('/')
  .get(sendArticles)
  .post(sendNewArticle)
  .all(handle405);

articleRouter
  .route('/:article_id')
  .get(sendArticlesByID)
  .patch(sendPatchedArticle)
  .delete(sendDeletedArticle)
  .all(handle405);

articleRouter
  .route('/:article_id/comments')
  .get(sendCommentsByID)
  .post(sendNewCommentByID)
  .all(handle405);

module.exports = articleRouter;
