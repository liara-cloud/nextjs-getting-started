// utils/logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(),  // Log to console
    new transports.File({ filename: 'logs/app.log' })  // Log to file
  ],
});

module.exports = logger;
