const connection = require('../db/connection');

exports.getArticles = (
  limit = 10,
  sort_by = 'created_at',
  p,
  order = 'desc',
  whereConditions
) => {
  return connection
    .select(
      'articles.article_id',
      'articles.body',
      'articles.created_at',
      'articles.title',
      'articles.topic',
      'articles.votes',
      'articles.author'
    )
    .count('comments.article_id AS comment_count')
    .from('articles')
    .where(whereConditions)
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .limit(limit, p)
    .offset((p - 1) * limit)
    .orderBy(sort_by, order);
};

exports.getArticleCount = () => {
  return connection.count('article_id AS total_count').from('articles');
};

exports.getArticlesByID = articleById => {
  return connection
    .select(
      'articles.article_id',
      'articles.author',
      'articles.title',
      'articles.votes',
      'articles.topic',
      'articles.body',
      'articles.created_at'
    )
    .count('comments.article_id AS comment_count')
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .groupBy('articles.article_id')
    .from('articles')
    .where('articles.article_id', '=', articleById)
    .returning('*');
};

exports.patchArticleByID = () => {
  return connection;
};

exports.deleteArticleByID = () => {
  return connection;
};
