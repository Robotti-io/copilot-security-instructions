import { z } from 'zod';
import { logger } from 'copilot-instructions-mcp/core';



function list_resources(server) {
  server.registerTool(
    'list_resources',
    {
      title: 'List Resources',
      description: 'Lists all available resources based on filtered scope.',
      inputSchema: {
        resourceType: z.enum(['user', 'framework', 'websites']).optional().describe('Optional resource type to filter results by. If omitted, all resource types are returned.'),
      },
    },
    async (args, extra) => {
      logger.info('List all resources tool call', {
        source: 'mcp_tools.list_resources',
        details: {
          args,
          extra,
        },
      });
      if (args?.resourceType && typeof args.resourceType !== 'string') {
        logger.warn('Invalid resource type provided', {
          source: 'mcp_tools.list_resources',
          details: {
            args,
            extra,
          },
        });
      }
      // TODO: Implement resources map retrieval
      return {
        content: [{
          type: 'text',
          text: 'No resources available',
        }],
      };
    },
  );
}

export default list_resources;
