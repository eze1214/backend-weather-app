const endpoints = require('config').get('endpoints');
const apiKey = require('config').get('server.apiKey');
const axios = require('axios');

class ForecastService {
  getByCity(cityId) {
    return axios({
      method: 'get',
      params: {id: cityId, appid: apiKey},
      url: `${endpoints.baseUrl}${endpoints.forecast}`,
    });
  }
}

module.exports = ForecastService;