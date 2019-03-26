const formatArticles = articleData => articleData.map(({ created_by, created_at, ...restOfArticle }) => ({
  author: created_by,
  created_at: new Date(created_at),
  ...restOfArticle,
}));

const userRef = userData => userData.reduce((userObj, userCurr) => {
  userObj[userCurr.username] = userCurr.username;
  return userObj;
}, {});

const articleRef = articleData => articleData.reduce((articleObj, articleCurr) => {
  articleObj[articleCurr.title] = articleCurr.article_id;
  return articleObj;
}, {});

const formatComments = (commentData, articleRef) => commentData.map(({
  created_at, created_by, belongs_to, body, votes,
}) => ({
  created_at: new Date(created_at),
  author: created_by,
  article_id: articleRef[belongs_to],
  body,
  votes,
}));

module.exports = {
  formatArticles, formatComments, articleRef, userRef,
};
