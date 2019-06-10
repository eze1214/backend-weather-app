const moment = require('moment');
const serverName = require('config').get('name');

const morganFormatter = (tokens, req, res) => {
  return [
    moment().format('YYYY-MM-DD HH:mm:ss'),
    `[${serverName}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res)
  ].join(' ');
};

module.exports = morganFormatter;
