---
agent: "mcp-protocol-engineer"
name: implement-mcp-http-basics
description: "Implement baseline MCP HTTP request parsing/handling in src/express_app.js with safe defaults and verification steps."
---

Goal: Improve the MCP HTTP endpoint implementation in `src/express_app.js`:
- Parse JSON safely (correct middleware + size limit)
- Validate required Accept headers for MCP POST
- Return appropriate status codes for invalid inputs
- Ensure transport handling receives the correct request body

Output:
- Proposed minimal changes
- Full updated file content for `src/express_app.js` (and any other necessary file)
- Verification checklist:
  - curl examples (good + bad requests)
  - expected status codes and content-types
Constraints:
- Minimal diffs and safe-by-default behavior
- Avoid logging raw request bodies
