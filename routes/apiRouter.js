const apiRouter = require('express').Router();
const topicRouter = require('./topicRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');
const userRouter = require('./userRouter');
const { sendApiEndpoints } = require('../controllers/api');

apiRouter.use('/topics', topicRouter);

apiRouter.use('/articles', articleRouter);

apiRouter.use('/comments', commentRouter);

apiRouter.use('/users', userRouter);

apiRouter.route('/api', apiRouter).get(sendApiEndpoints);

module.exports = apiRouter;
