const httpCodes = require('config').get('httpCodes');
const HttpError = require('../http-error');

var notFoundHandler = function(request, response, next) {
  response.status(httpCodes.notFound).send('Not Found');
};

module.exports = notFoundHandler;
