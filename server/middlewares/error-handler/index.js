const httpCodes = require('config').get('httpCodes');

var errorHandler = function(error, request, response, next) {
  console.log('Error handler', JSON.stringify(error));
  response.status(error.statusCode || httpCodes.error);
  response.send(error);
};

module.exports = errorHandler;
