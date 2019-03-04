const apiRouter = require('express').Router();
const topicRouter = require('./topicRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');
const userRouter = require('./userRouter');
const { endpoints } = require('../endpoints');

apiRouter.use('/topics', topicRouter);

apiRouter.use('/articles', articleRouter);

apiRouter.use('/comments', commentRouter);

apiRouter.use('/users', userRouter);

apiRouter.get('/', (req, res, next) => {
  res.status(200).send(endpoints);
});

module.exports = apiRouter;
