const articleRouter = require('express').Router();
const { sendArticles, sendArticlesByID } = require('../controllers/articles');

articleRouter.route('/').get(sendArticles);

articleRouter.route('/:article_id').get(sendArticlesByID);

module.exports = articleRouter;
