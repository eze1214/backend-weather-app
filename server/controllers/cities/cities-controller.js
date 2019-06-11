const citiesService = require('../../services/cities-service');
const httpCodes = require('config').get('httpCodes');

const cities = function(request, response, next) {
  const city = request.query.city;
  
    citiesService.filter(city)
      .then(filteredCities => {
        console.log(filteredCities);
        response.status(httpCodes.success).send(filteredCities);
      })
      .catch(error => {
        console.log(error);
        console.log(JSON.stringify(error), 'my fetch error');
        next(error);
      });
  };

module.exports = cities;