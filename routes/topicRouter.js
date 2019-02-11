const topicRouter = require('express').Router();
const {
  sendTopics,
  sendNewTopic,
  sendTopicArticles
} = require('../controllers/topic');

topicRouter
  .route('/')
  .get(sendTopics)
  .post(sendNewTopic);

topicRouter.route('/:topic/articles').get(sendTopicArticles);

module.exports = topicRouter;
