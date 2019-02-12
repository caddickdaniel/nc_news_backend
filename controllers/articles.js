const {
  getArticles,
  getArticleCount,
  getArticlesByID,
  patchArticleByID,
  deleteArticleByID,
  addArticle
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
    .then(([articles]) => {
      // console.log(articles);
      res.status(200).send({ articles });
    })
    .catch(err => next(err));
};

exports.sendNewArticle = (req, res, next) => {
  const articleToAdd = req.body;

  // console.log(article);
  addArticle(articleToAdd)
    .then(([article]) => res.status(201).send({ article }))
    .catch(err => console.log(err) || next(err));
};

exports.sendPatchedArticle = () => {
  const articles = req.body;

  patchArticleByID(articles)
    .then(([articles]) => res.status(204).send({ articles }))
    .catch(err => next(err));
};

exports.sendDeletedArticle = () => {
  const articles = req.body;

  deleteArticleByID(articles)
    .then(([articles]) => res.status(204).send({ articles }))
    .catch(err => next(err));
};
