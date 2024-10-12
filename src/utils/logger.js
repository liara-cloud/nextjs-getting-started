// utils/logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: 'info',  // Set default log level to 'info'
  format: combine(
    timestamp(),  // Include timestamp
    logFormat     // Use the custom format
  ),
  transports: [
    new transports.Console(),  // Log to the console
    new transports.File({ filename: 'logs/app.log' })  // Log to a file
  ],
});

module.exports = logger;
