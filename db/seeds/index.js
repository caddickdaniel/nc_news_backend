const { userData, topicData, articleData, commentData } = require('../data');

const {
  formatArticles,
  formatComments,
  userRef,
  articleRef
} = require('../utils/index');

exports.seed = function(connection, Promise) {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() =>
      connection('users')
        .insert(userData)
        .returning('*')
    )
    .then(() =>
      connection('topics')
        .insert(topicData)
        .returning('*')
    )
    .then(usersRows => {
      const userLookup = userRef(usersRows);
      const formattedArticles = formatArticles(articleData, userLookup);
      return Promise.all([
        userLookup,
        connection('articles')
          .insert(formattedArticles)
          .returning('*')
      ]);
    })
    .then(([userLookup, articleRows]) => {
      const articlesLookup = articleRef(articleRows, 'username');

      const formattedComms = formatComments(
        commentData,
        articlesLookup,
        userLookup
      );

      return connection('comments')
        .insert(formattedComms)
        .returning('*');
    });
};
