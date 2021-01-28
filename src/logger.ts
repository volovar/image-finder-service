import winston from "winston";

const consoleTransport = new winston.transports.Console();
const loggerOptions = {
  transports: [consoleTransport],
};

const logger = winston.createLogger(loggerOptions);

export default logger;
