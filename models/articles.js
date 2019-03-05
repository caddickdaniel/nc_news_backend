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

exports.addArticle = newArticle => {
  return connection
    .insert(newArticle)
    .into('articles')
    .returning('*');
};

exports.patchArticleByID = (articleID, incBy) => {
  return connection('articles')
    .where('articles.article_id', '=', articleID)
    .increment('votes', incBy || 0)
    .returning('*');
};

exports.deleteArticleByID = article => {
  return connection('articles')
    .where('articles.article_id', '=', article)
    .del();
};

exports.commentsByID = (
  article_id,
  limit = 10,
  p = 1,
  sort_by = 'created_at',
  order = 'desc'
) => {
  return (
    connection('comments')
      .select('comments.*')
      .leftJoin('articles', 'articles.article_id', '=', 'comments.article_id')
      // .groupBy('articles.article_id')
      .where('comments.article_id', '=', article_id)
      .limit(limit, p)
      .offset((p - 1) * limit)
      .orderBy(sort_by, order)
      .returning('*')
  );
};

exports.newCommentByID = newComment => {
  return connection
    .insert(newComment)
    .into('comments')
    .returning('*');
};
