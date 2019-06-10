const endpoints = require('config').get('endpoints');
const apiKey = require('config').get('server.apiKey');
const axios = require('axios');

class CurrentService {
  getByCity(cityId) {
    return axios({
      method: 'get',
      params: {id: cityId, appid: apiKey},
      url: `${endpoints.baseUrl}${endpoints.current}`,
    });
  }
}

module.exports = CurrentService;