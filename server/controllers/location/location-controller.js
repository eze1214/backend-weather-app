const locationService = require('../../services/location-service');
const httpCodes = require('config').get('httpCodes');

var locationController = function(request, response, next) {
  locationService.get(request.query.ip)
    .then(responseLocation => {
      response.status(httpCodes.success).send(responseLocation)
    })
    .catch(error => next(error));
};

module.exports = locationController