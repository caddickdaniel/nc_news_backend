const articleRouter = require('express').Router();
const {
  sendArticles,
  sendArticlesByID,
  sendNewArticle,
  sendPatchedArticle,
  sendDeletedArticle,
  sendCommentsByID
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

articleRouter.route('/:article_id/comments').get(sendCommentsByID);

module.exports = articleRouter;
