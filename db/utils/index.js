const { articleData, commentData } = require('../data');

const formatArticles = articleData => {
  return articleData.map(({ created_by, created_at, ...restOfArticle }) => {
    return {
      username: created_by,
      created_at: new Date(created_at),
      ...restOfArticle
    };
  });
};

const userRef = userData =>
  userData.reduce((userObj, userCurr) => {
    userObj[userCurr.username] = userCurr.username;
    return userObj;
  }, {});

const articleRef = articleData =>
  articleData.reduce((articleObj, articleCurr) => {
    articleObj[articleCurr.title] = articleCurr.article_id;
    return articleObj;
  }, {});

const formatComments = (commentData, articleRef) => {
  return commentData.map(
    ({ created_at, created_by, belongs_to, body, votes }) => ({
      created_at: new Date(created_at),
      username: created_by,
      article_id: articleRef[belongs_to],
      body,
      votes
    })
  );
};

//declare as variables

module.exports = { formatArticles, formatComments, articleRef, userRef };
