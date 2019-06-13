const endpoints = require('config').get('endpoints');
const apiKey = require('config').get('server.apiKey');
const axios = require('axios');
const { kelvinToCelsius } = require('../../utils/transform-units');

class ForecastService {
  getByCity(cityId) {
    return axios({
      method: 'get',
      params: {id: cityId, appid: apiKey},
      url: `${endpoints.baseUrl}${endpoints.forecast}`,
    }).then(response => {
      return this.groupByDate(response.data);
    });
  }

  generateWeather(weather, time) {
    try {
      return {
        time: time,
        temp: kelvinToCelsius(weather.main.temp),
        maxTemperature: kelvinToCelsius(weather.main.temp_max),
        minTemperature: kelvinToCelsius(weather.main.temp_min),
        humidity: weather.main.humidity,
        conditions: weather.weather,
      }
    } catch (error){
      throw (new Error(`Error creating weather object ${error}`))
    }
  }

  groupByDate(data) {
    return new Promise((resolve, reject) => {
      const groupedByDate = new Map();
      try {
        data.list.map(weather => {
          const [ date, time ] = weather.dt_txt.split(' ');
          if (groupedByDate.has(date)) {
            const savedWeather = groupedByDate.get(date);
            savedWeather.weathers.push(this.generateWeather(weather, time));
            groupedByDate.set(date, savedWeather);
          } else {
            groupedByDate.set(date, {date: date, weathers: [ this.generateWeather(weather, time) ]}) ;
          }
        })
        resolve (Array.from(groupedByDate.values()));
      } catch (error) {
        reject (error);
      }
    })
  }
}

module.exports = ForecastService;