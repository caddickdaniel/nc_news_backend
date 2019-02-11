const connection = require('../db/connection');

exports.getTopics = (limit = 2, sort_by = 'slug', order = 'desc') => {
  return connection
    .select('*')
    .from('topics')
    .limit(limit)
    .orderBy(sort_by, order)
    .returning('*');
};

exports.addTopic = addTopic => {
  return connection
    .insert(addTopic)
    .into('topics')
    .returning('*');
};

exports.getTopicArticles = (
  topic,
  limit = 10,
  sort_by = 'created_at',
  p,
  order = 'desc'
) => {
  return connection
    .select('articles.*')
    .count('comments.comment_id AS comment_count')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .from('articles')
    .groupBy('articles.article_id')
    .where('topic', '=', topic)
    .returning('*')
    .limit(limit)
    .orderBy(sort_by, order)
    .offset((p - 1) * limit);
};

exports.countTopicArticles = () => {
  return connection
    .select('articles.topic')
    .count('articles.topic')
    .join('articles', 'topics.slug', '=', 'articles.topic')
    .from('topics')
    .groupBy('articles.topic');
};
//NEEDS WORKING ON
