const currentService = require('../../services/current-service');
const citiesService = require('../../services/cities-service');
const httpCodes = require('config').get('httpCodes');
const locationService = require('../../services/location-service');

const specific = function(request, response, next) {
  const city = request.params.city;
  
  Promise.all([
    citiesService.get(parseInt(city)),
    currentService.getByCity(city)
  ])
    .then(responseCurrent => {
      console.log(responseCurrent[1].data);
      const resp = {
        location: responseCurrent[0],
        weather: responseCurrent[1].data
      }
      response.status(httpCodes.success).send(resp);
    })
    .catch(error => {
      console.log(JSON.stringify(error), 'my fetch error');
      next(error)
    });
};

const current = function(request, response, next) {
  let location;
  locationService.get(request.query.ip)
    .then(locationResponse => {
      location = locationResponse;
      console.log(location);
      return citiesService.getByLocation(location.city, location.country);
    })
    .then(city => currentService.getByCity(city.id))
    .then(weatherResponse => {
      const resp = {
        location: location,
        weather: weatherResponse.data
      }
      response.status(httpCodes.success).send(resp);
    })
    .catch(error => next(error));
};

module.exports = {
  specific: specific,
  current: current
};