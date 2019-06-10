const cities = require('../../models/cities');
const httpCodes = require('config').get('httpCodes');

class CitiesService {
  get(cityId) {
    return new Promise((resolve, reject) => {
      const searchedCity = cities.find(city => city.id === cityId);
      if (searchedCity) {
        resolve(searchedCity);
      } else {
        reject ({ message: 'Not found city', statusCode: httpCodes.notFound });
      }
    });
  }

  getByLocation(name, country) {
    return new Promise((resolve, reject) => {
      const searchedCity = cities.find(city => city.name === name && city.country === country);
      if (searchedCity) {
        resolve(searchedCity);
      } else {
        console.log(name);
        reject ({ message: 'Not found city', statusCode: httpCodes.notFound });
      }
    });
  }
}

module.exports = CitiesService;