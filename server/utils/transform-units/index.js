const kelvinToCelsius = function(kelvin) {
  return parseFloat((kelvin - 273).toFixed(2))
}

module.exports = {
  kelvinToCelsius: kelvinToCelsius
}