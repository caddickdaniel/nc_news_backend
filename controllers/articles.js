const {
  getArticles,
  getArticleCount,
  getArticlesByID,
  patchArticleByID,
  deleteArticleByID,
  addArticle,
  commentsByID,
  newCommentByID,
  getArticlesByTopic
} = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  const { limit, sort_by, p, order, author } = req.query;
  const whereConditions = author ? { 'articles.author': author } : {};
  Promise.all([
    getArticleCount(),
    getArticles(limit, sort_by, p, order, whereConditions)
  ])
    .then(([total_count, articles]) => {
      res.status(200).send({ total_count, articles });
    })
    .catch(err => next(err));
};

exports.sendArticlesByID = (req, res, next) => {
  const articleById = req.params.article_id;
  getArticlesByID(articleById)
    .then(([article]) => {
      if (!article)
        return Promise.reject({
          status: 404,
          message: 'Article ID doesnt exist'
        });
      res.status(200).send({ article });
    })
    .catch(err => next(err));
};

exports.sendArticlesByTopic = (req, res, next) => {
  const topic = req.query;
  const whereConditions = topic ? { 'articles.topic': topic } : {};

  getArticlesByTopic(topic, whereConditions)
    .then(articles => {
      if (!topic)
        return Promise.reject({
          status: 404,
          message: 'Topic doesnt exist'
        });
      res.status(200).send({ articles });
    })
    .catch(err => next(err));
};

exports.sendNewArticle = (req, res, next) => {
  const articleToAdd = req.body;

  addArticle(articleToAdd)
    .then(([article]) => res.status(201).send({ article }))
    .catch(err => next(err));
};

exports.sendPatchedArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  patchArticleByID(article_id, inc_votes)
    .then(([article]) => {
      if (typeof inc_votes !== 'number')
        return Promise.reject({
          status: 400,
          message: 'Malformed syntax, check you have entered a Number'
        });
      res.status(200).send({ article });
    })
    .catch(err => console.log(err) || next(err));
};

exports.sendDeletedArticle = (req, res, next) => {
  const { article_id } = req.params;

  deleteArticleByID(article_id)
    .then(() => {
      if (!article_id)
        return Promise.reject({
          status: 404,
          message: 'Article ID doesnt exist'
        });
      res.sendStatus(204);
    })
    .catch(err => next(err));
};

exports.sendCommentsByID = (req, res, next) => {
  const { article_id } = req.params;
  const { limit, p, sort_by, order } = req.query;

  commentsByID(article_id, limit, p, sort_by, order)
    .then(comments => {
      if (!comments)
        return Promise.reject({
          status: 400,
          message: 'Unfortunately there isnt any comments for this article'
        });
      res.status(200).send({ comments });
    })
    .catch(err => next(err));
};

exports.sendNewCommentByID = (req, res, next) => {
  const { article_id } = req.params;

  newCommentByID({ article_id, ...newComment })
    .then(([comment]) => res.status(201).send({ comment }))

    .catch(err => next(err));
};
