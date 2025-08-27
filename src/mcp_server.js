import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import mcpTools from 'copilot-instructions-mcp/mcp_tools';




function makeMCPServer() {
  const server = new McpServer({
    name: 'copilot-instructions-mcp',
    version: '1.0.0',
  });

  mcpTools.list_resources(server);
  mcpTools.list_prompts(server);
  mcpTools.get_prompt(server);

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  return { server, transport };
}



export default makeMCPServer;
