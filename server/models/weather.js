class Weather {
  constructor(info) {
    this.temp = info.temp;
    this.pressure = info.pressure;
    this.humidity = info.humidity;
    this.temp_min = info.temp_min;
    this.temp_max = info.temp_max;
  }
}

module.exports = Weather;