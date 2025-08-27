import { logger } from 'copilot-instructions-mcp/core';
import { prompts } from 'copilot-instructions-mcp/mcp_prompts';

function list_prompts(server) {
  server.registerTool(
    'list-prompts',
    {
      title: 'List Prompts',
      description: 'A tool to list all available prompts',
      inputSchema: {},
    },
    async () => {
      logger.info('List prompts tool called', {
        source: 'mcp_tools.list_prompts',
      });
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(Object.keys(prompts), null, 2),
        }],
      };
    },
  );
}

export default list_prompts;
