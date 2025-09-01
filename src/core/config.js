import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const server = {
  port: process.env['server.port'] ? parseInt(process.env['server.port'], 10) : 8080,
  hostname: process.env['server.hostname'] || 'localhost',
  ssl: process.env['server.ssl'] === 'true' || false,
  'ssl.pfx': process.env['server.ssl.pfx'] || 'localhost.pfx',
  'ssl.pfx.passphrase': process.env['server.ssl.pfx.passphrase'] || 'PFX_PASSPHRASE',
};

const logger = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    warn: 'magenta',
    info: 'blue',
    http: 'yellow',
    debug: 'green',
    silly: 'gray',
  },
  transports: {
    console: {
      enabled: process.env['logger.transports.console.enabled'] === 'true' || false,
      level: process.env['logger.transports.console.level'] || 'info',
    },
    amqp: {
      enabled: process.env['logger.transports.amqp.enabled'] === 'true' || false,
      level: process.env['logger.transports.amqp.level'] || 'http',
      protocol: 'amqp',
      exchange: process.env['logger.transports.amqp.exchange'] || 'logs',
      hostname: process.env['logger.transports.amqp.hostname'] || 'localhost',
      port: process.env['logger.transports.amqp.port'] ? parseInt(process.env['logger.transports.amqp.port'], 10) : 5672,
      username: process.env['logger.transports.amqp.username'] || 'guest',
      password: process.env['logger.transports.amqp.password'] || 'guest',
      vhost: process.env['logger.transports.amqp.vhost'] || '/logs',
      heartbeat: process.env['logger.transports.amqp.heartbeat'] ? parseInt(process.env['logger.transports.amqp.heartbeat'], 10) : 60,
      locale: process.env['logger.transports.amqp.locale'] || 'en_US',
      type: process.env['logger.transports.amqp.type'] || 'direct',
      durable: process.env['logger.transports.amqp.durable'] === 'true' || false,
      app: process.env['server.hostname'] || 'localhost',
    },
  },
};

export {
  server,
  logger,
};

export default {
  server,
  logger,
};
