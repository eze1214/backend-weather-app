const apiRoutes = require('./api');
const errorHandler = require('../middlewares/error-handler');
const notFoundHandler = require('../middlewares/not-found-handler');

const init = function(server) {
  server.use('/v1', apiRoutes);
  server.use(errorHandler);
  server.use(notFoundHandler);
};

module.exports = {
  init: init
};
