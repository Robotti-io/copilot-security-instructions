import { z } from 'zod';
import { logger } from 'copilot-instructions-mcp/core';
import { prompts } from 'copilot-instructions-mcp/mcp_prompts';

function get_prompt(server) {
  server.registerTool(
    'get_prompt',
    {
      title: 'get_prompt',
      description: 'A tool to get a specific prompt by name',
      inputSchema: {
        promptName: z.enum(Object.keys(prompts)).describe('The name of the prompt to retrieve'),
      },
    },
    async (args, extra) => {
      logger.info('Get prompt tool called', {
        source: 'mcp_tools.get_prompt',
        details: {
          args,
          extra,
        },
      });
      const prompt = prompts[args.promptName];
      if (!prompt) {
        return {
          content: [{
            type: 'text',
            text: `Prompt not found: ${args.promptName}`,
          }],
        };
      }
      return {
        content: [{
          type: 'text',
          text: prompt,
        }],
      };
    },
  );
}

export default get_prompt;
