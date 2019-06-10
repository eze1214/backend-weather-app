const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const application = require('config').get('name');
const loggerLevel = require('config').get('logger.level');
const moment = require('moment');

const customFormat = printf(info => {
  return `${moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss')} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
  level: loggerLevel,
  format: combine(
    format.colorize(),
    label({ label: application }),
    timestamp(),
    customFormat
  ),
  transports: [ new transports.Console() ]
});

module.exports = logger;
