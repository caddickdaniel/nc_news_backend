const articleRouter = require('express').Router();
const {
  sendArticles,
  sendArticlesByID,
  sendNewArticle
} = require('../controllers/articles');

articleRouter
  .route('/')
  .get(sendArticles)
  .post(sendNewArticle);

articleRouter.route('/:article_id').get(sendArticlesByID);

module.exports = articleRouter;
