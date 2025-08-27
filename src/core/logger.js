import { createLogger } from 'winston';
import transports from './transports/index.js';
import { logger as loggerConfig } from './config.js';

const logger = createLogger({
  levels: loggerConfig.levels,
  transports,
});

export default logger;
