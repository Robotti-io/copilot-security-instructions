import { config, logger } from 'copilot-instructions-mcp/core';
import app from './src/express_app.js';

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
