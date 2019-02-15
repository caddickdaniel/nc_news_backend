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
  // console.log(req.params);
  const whereConditions = author ? { 'articles.author': author } : {};
  Promise.all([
    getArticleCount(),
    getArticles(limit, sort_by, p, order, whereConditions)
  ])
    .then(([total_count, articles]) => {
      // console.log(articles);
      res.status(200).send({ total_count, articles });
    })
    .catch(err => console.log(err) || next(err));
};

exports.sendArticlesByID = (req, res, next) => {
  const articleById = req.params.article_id;
  // console.log(articleById.article_id);
  getArticlesByID(articleById)
    .then(([article]) => {
      // console.log(article);
      if (!article)
        return Promise.reject({
          status: 404,
          message: 'Article ID doesnt exist'
        });
      res.status(200).send({ article });
    })
    .catch(err => console.log(err) || next(err));
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
    .catch(err => console.log(err) || next(err));
};

exports.sendNewArticle = (req, res, next) => {
  const articleToAdd = req.body;

  // console.log(article);
  addArticle(articleToAdd)
    .then(([article]) => res.status(201).send({ article }))
    .catch(err => console.log(err) || next(err));
};

exports.sendPatchedArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  // console.log('ho');
  patchArticleByID(article_id, inc_votes)
    .then(([article]) => {
    if (inc_votes !== Number) return Promise.reject({
      status: 400,
      message: 'Malformed syntax, check you have entered a Number'
    });
    res.status(200).send({article})
    })
    .catch(err => console.log(err) || next(err));
};

exports.sendDeletedArticle = (req, res, next) => {
  const { article_id } = req.params;

  deleteArticleByID(article_id)
    .then(() => {
      if(!article_id) return Promise.reject({
        status: 404,
        message: 'Article ID doesnt exist'
      })
    res.sendStatus(204)
    })
    .catch(err => console.log(err) || next(err));
};

exports.sendCommentsByID = (req, res, next) => {
  const { article_id } = req.params;
  const { limit, p, sort_by, order } = req.query;
// console.log('KASNDKLANSD')
  commentsByID(article_id, limit, p, sort_by, order)
    .then(comments => {
      console.log(comments)
      if(!comments) return Promise.reject({
        status: 400,
        message: 'Unfortunately there isnt any comments for this article' 
      })
    res.status(200).send({ comments })
    })
    .catch(err => console.log(err) || next(err));
};

exports.sendNewCommentByID = (req, res, next) => {
  const { article_id } = req.params;

  // console.log(newComment);
  newCommentByID({ article_id, ...newComment })
    .then(([comment]) => console.log(comment) || res.status(201).send({ comment }))
    
    .catch(err => console.log(err) || next(err));
};
