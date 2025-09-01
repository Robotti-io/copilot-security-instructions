import fs from 'fs';
import path from 'path';
import https from 'https';
import { config, logger } from 'copilot-instructions-mcp/core';
import app from './src/express_app.js';

function listenHTTP() {
  app.listen(config.server.port, (error) => {
    if (error) {
      logger.error('Error starting server', {
        source: 'server.listenHTTP',
        details: {
          port: config.server.port,
          hostname: config.server.hostname,
        },
        error: {
          message: error.message || 'Unknown error',
          stack: error.stack || 'No stack trace available',
        },
      });
    } else {
      logger.info(`Server listening on port ${config.server.port}`, {
        source: 'server.listenHTTP',
        details: {
          port: config.server.port,
          hostname: config.server.hostname,
        },
      });
    }
  });
}

function listenHTTPS() {
  https.createServer({
    pfx: fs.readFileSync(path.resolve(config.server['ssl.pfx'])),
    passphrase: config.server['ssl.pfx.passphrase'],
  }, app).listen(config.server.port, (error) => {
    if (error) {
      logger.error('Error starting server', {
        source: 'server.listenHTTPS',
        details: {
          port: config.server.port,
          hostname: config.server.hostname,
        },
        error: {
          message: error.message || 'Unknown error',
          stack: error.stack || 'No stack trace available',
        },
      });
    } else {
      logger.info(`Server listening on port ${config.server.port}`, {
        source: 'server.listenHTTPS',
        details: {
          port: config.server.port,
          hostname: config.server.hostname,
        },
      });
    }
  });
}

if (config.server.ssl) {
  listenHTTPS();
} else {
  listenHTTP();
}
