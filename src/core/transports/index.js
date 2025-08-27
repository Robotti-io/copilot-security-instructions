import { logger } from '../config.js';

import ConsoleTransport from './console.js';
import AMQPTransport from './amqp.js';

const transports = [];

if (logger.transports.console.enabled) {
  transports.push(new ConsoleTransport(
    logger.transports.console,
    logger.colors,
  ));
}

if (logger.transports.amqp.enabled) {
  transports.push(new AMQPTransport(
    logger.transports.amqp,
  ));
}

export default transports;
