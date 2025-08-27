import express from 'express';
import { logger } from 'copilot-instructions-mcp/core';
import { reqInfo } from 'copilot-instructions-mcp/middlewares';
import mcpServer from './mcp_server.js';

const app = express();

app.use(reqInfo);

app.get('/', (req, res) => {
  logger.info('Received request for homepage', {
    source: 'express_app.get(/)',
    reqInfo: req.info,
  });
  // TODO: Read in frontend homepage
  const homeHTML = '<html><head><title>Robotti MCP</title></head><body><h1>Welcome to Robotti MCP</h1></body></html>';
  return res.status(200).send(homeHTML);
});

app.get('/mcp', (req, res) => {
  // TODO: Log request details
  /** TODO: Implement MCP Server GET Specification
      Specification 1: The client MAY issue an HTTP GET to the MCP endpoint. This can be used to open an SSE stream, allowing the server to communicate to the client, without the client first sending data via HTTP POST.
      Specification 2: The client MUST include an Accept header, listing text/event-stream as a supported content type.
      Specification 3: The server MUST either return Content-Type: text/event-stream in response to this HTTP GET, or else return HTTP 405 Method Not Allowed, indicating that the server does not offer an SSE stream at this endpoint.
      Specification 4: If the server initiates an SSE stream:
      - The server MAY send JSON-RPC requests and notifications on the stream.
      - These messages SHOULD be unrelated to any concurrently-running JSON-RPC request from the client.
      - The server MUST NOT send a JSON-RPC response on the stream unless resuming a stream associated with a previous client request.
      - The server MAY close the SSE stream at any time.
      - The client MAY close the SSE stream at any time.
  */
  logger.info('Received MCP GET request', {
    source: 'express_app.get(/mcp)',
    reqInfo: req.info,
  });
  return res.status(405).send('Method Not Allowed');
});

app.post('/mcp', async (req, res) => {
  // TODO: Log request details
  /** TODO: Send Request to `mcp_server` for proper handling
      Every JSON-RPC message sent from the client MUST be a new HTTP POST request to the MCP endpoint.
      1. The client MUST use HTTP POST to send JSON-RPC messages to the MCP endpoint.
      2. The client MUST include an Accept header, listing both application/json and text/event-stream as supported content types.
      3. The body of the POST request MUST be a single JSON-RPC request, notification, or response.
      4. If the input is a JSON-RPC response or notification:
         - If the server accepts the input, the server MUST return HTTP status code 202 Accepted with no body.
         - If the server cannot accept the input, it MUST return an HTTP error status code (e.g., 400 Bad Request). The HTTP response body MAY comprise a JSON-RPC error response that has no id.
      5. If the input is a JSON-RPC request, the server MUST either return Content-Type: text/event-stream, to initiate an SSE stream, or Content-Type: application/json, to return one JSON object. The client MUST support both these cases.
      6. If the server initiates an SSE stream:
         - The SSE stream SHOULD eventually include JSON-RPC response for the JSON-RPC request sent in the POST body.
         - The server MAY send JSON-RPC requests and notifications before sending the JSON-RPC response. These messages SHOULD relate to the originating client request.
         - The server SHOULD NOT close the SSE stream before sending the JSON-RPC response for the received JSON-RPC request, unless the session expires.
         - After the JSON-RPC response has been sent, the server SHOULD close the SSE stream.
         - Disconnection MAY occur at any time (e.g., due to network conditions). Therefore:
           - Disconnection SHOULD NOT be interpreted as the client cancelling its request.
           - To cancel, the client SHOULD explicitly send an MCP CancelledNotification.
           - To avoid message loss due to disconnection, the server MAY make the stream resumable.
  */
  // await server.connect(transport);
  logger.info('Received MCP POST request', {
    source: 'express_app.post(/mcp)',
    reqInfo: req.info,
  });

  const mcp = mcpServer();
  await mcp.server.connect(mcp.transport);
  await mcp.transport.handleRequest(req, res, req.body);
  // return res.status(200).send('OK'); // Temporary response
});

export default app;
