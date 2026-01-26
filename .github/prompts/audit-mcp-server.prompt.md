---
agent: "mcp-server-orchestrator"
name: audit-mcp-server
description: "Audit src/ MCP server implementation for protocol compliance, stability, and security; propose prioritized patches."
---

Goal: Review the MCP server implementation under `src/` and propose concrete improvements.

Scope:
- `src/express_app.js`
- `src/mcp_server.js`
- `src/mcp_tools/*`
- `src/mcp_prompts/*`
- `src/middlewares/*`
- tests if present

Process:
1) Protocol & transport: request parsing, Accept headers, SSE behavior, JSON-RPC correctness, lifecycle.
2) Tooling: naming consistency, schemas, output stability, error paths.
3) Security: body limits, logging hygiene, DoS considerations, safe defaults.
4) Provide prioritized improvements: P0/P1/P2.

Output format:
- `## Summary`
- `## P0 fixes` (must-do)
- `## P1 improvements`
- `## P2 nice-to-haves`
- For each fix:
  - Problem + evidence (file path)
  - Proposed change
  - Patch (full updated file contents in fenced `md` blocks)
- `## Verification checklist` (commands + expected results)

Constraints:
- Minimal diffs, focused changes.
- Don’t invent new architecture unless necessary; propose incremental steps.
