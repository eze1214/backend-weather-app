const forecastService = require('../../services/forecast-service');
const citiesService = require('../../services/cities-service');
const httpCodes = require('config').get('httpCodes');
const locationService = require('../../services/location-service');

const specific = function(request, response, next) {
  const city = request.params.city;
  
  Promise.all([
    citiesService.get(parseInt(city)),
    forecastService.getByCity(city)
  ])
    .then(responseCurrent => {
      console.log(responseCurrent[1]);
      const resp = {
        location: responseCurrent[0],
        weathers: responseCurrent[1]
      }
      response.status(httpCodes.success).send(resp);
    })
    .catch(error => next(error));
};

const current = function(request, response, next) {
  let location;
  locationService.get(request.query.ip)
    .then(locationResponse => {
      location = locationResponse;
      return citiesService.getByLocation(location.city, location.country);
    })
    .then(city => forecastService.getByCity(city.id))
    .then(weatherResponse => {
      const resp = {
        location: location,
        weathers: weatherResponse
      }
      response.status(httpCodes.success).send(resp);
    })
    .catch(error => next(error));
};

module.exports = {
  specific: specific,
  current: current
};