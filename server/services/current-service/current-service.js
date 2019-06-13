const endpoints = require('config').get('endpoints');
const apiKey = require('config').get('server.apiKey');
const axios = require('axios');
const { kelvinToCelsius } = require('../../utils/transform-units');

class CurrentService {
  getByCity(cityId) {
    return axios({
      method: 'get',
      params: {id: cityId, appid: apiKey},
      url: `${endpoints.baseUrl}${endpoints.current}`,
    }).then(response => {
      return Promise.resolve(this.createWeather(response.data))
    }).catch(error => {
      return Promise.reject(error);
    })
  }

  createWeather(data){
    try {
      return {
        temp: kelvinToCelsius(data.main.temp),
        humidity: data.main.humidity,
        maxTemperature: kelvinToCelsius(data.main.temp_max),
        minTemperature: kelvinToCelsius(data.main.temp_min),
        conditions: data.weather
      }
    } catch (error) {
      throw(new Error(`Error creating weather, ${error} `));
    }
  }
}

module.exports = CurrentService;