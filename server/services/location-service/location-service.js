const ipapi = require('ipapi.co');

class LocationService {
  get(ip) {
    return new Promise((resolve, reject) => {
      const callback = (res) => {
        resolve(res)
      };
      ipapi.location(callback, ip)
    });
  }
}

module.exports = LocationService;