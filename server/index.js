const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const logger = require('./utils/logger');
const morganFormatter = require('./utils/req-logger-formatter');
const routes = require('./routes');
const serverName = require('config').get('name');

const server = express();

let create = (config) => {
  // Server settings
  server.set('env', config.env);
  server.set('port', config.port);
  server.set('hostname', config.hostname);

  // JSON parser middleware
  //server.use(bodyParser.json());

  // Requests Logger
  server.use(morgan(morganFormatter));

  // Set up routes
  routes.init(server);
};

let start = () => {
  const hostname = server.get('hostname');
  const port = server.get('port');

  server.listen(port, () => {
    logger.info(`Server ${serverName} listening on - http://${hostname}:${port}`);
  });
};

module.exports = {
  create: create,
  start: start,
  server: server
};
