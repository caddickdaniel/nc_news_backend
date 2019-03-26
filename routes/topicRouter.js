const topicRouter = require('express').Router();
const { sendTopics, sendNewTopic, sendTopicArticles } = require('../controllers/topic');
const { handle405 } = require('../errors');

topicRouter
  .route('/')
  .get(sendTopics)
  .post(sendNewTopic)
  .all(handle405);

topicRouter
  .route('/:topic/articles')
  .get(sendTopicArticles)
  .all(handle405);

module.exports = topicRouter;
