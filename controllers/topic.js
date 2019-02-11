const {
  getTopics,
  addTopic,
  getTopicArticles,
  countTopicArticles
} = require('../models/topic');

exports.sendTopics = (req, res, next) => {
  const { limit, sort_by, order } = req.query;

  getTopics(limit, sort_by, order)
    .then(topics => res.status(200).send({ topics }))
    .catch(err => next(err));
};

exports.sendNewTopic = (req, res, next) => {
  const topic = req.body;

  // console.log(topic);
  addTopic(topic)
    .then(([topic]) => res.status(201).send({ topic }))
    .catch(err => next(err));
};

exports.sendTopicArticles = (req, res, next) => {
  const topic = req.params.topic;
  // console.log(topic);
  const { limit, sort_by, p, order } = req.query;

  Promise.all([
    getTopicArticles(topic, limit, sort_by, p, order),
    countTopicArticles(topic)
  ])
    .then(([articles, total_count]) =>
      res.status(200).send({ articles, total_count })
    )
    .catch(err => next(err));
};
