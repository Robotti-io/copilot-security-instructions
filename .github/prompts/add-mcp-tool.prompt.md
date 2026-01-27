---
agent: "mcp-tool-author"
name: add-mcp-tool
description: "Add a new MCP tool in src/mcp_tools with zod schema, deterministic outputs, and proper registration."
---

Goal: Add a new MCP tool to the server.

Inputs:
- Tool name (string): ${input:tool_name:Example: "search-prompts"}
- Title: ${input:title:Human-readable title}
- Description: ${input:description:One-line description}
- Inputs (fields): ${input:inputs:List input fields + types + descriptions}
- Output format: ${input:output:Describe the output shape (text/json string)}

Procedure:
1) Create `src/mcp_tools/<tool_name>.js` that registers the tool with:
   - stable `registerTool` name
   - zod input schema
   - consistent error handling
2) Export it from `src/mcp_tools/index.js`
3) Register it in `src/mcp_server.js`
4) Add a short manual test snippet showing how to call it.

Output:
- Brief change summary
- Full contents of all changed/new files in fenced `md` code blocks
- Manual verification steps
