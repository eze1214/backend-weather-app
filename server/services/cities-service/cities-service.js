const cities = require('../../models/cities');
const httpCodes = require('config').get('httpCodes');

class CitiesService {

  filter(cityName) {
    try {
      return Promise.resolve(cities.filter(city => city.name.toLowerCase().includes(cityName.toLowerCase())));
    } catch(error) {
      return Promise.reject(error)
    }
  }

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
        reject ({ message: 'Not found city', statusCode: httpCodes.notFound });
      }
    });
  }
}

module.exports = CitiesService;