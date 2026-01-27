---
agent: "mcp-security-hardener"
name: add-mcp-tests
description: "Add minimal tests for MCP endpoint behavior and tool registration to prevent regressions."
---

Goal: Add a minimal test suite for the MCP server under `tests/` to prevent regressions.

Coverage targets (minimal):
- `/health` returns 200
- `/mcp` GET returns 405 (or SSE if implemented)
- `/mcp` POST rejects invalid Accept / invalid JSON with clear errors
- Tool registration sanity: list tools / list prompts returns expected shape

Output:
- Test plan
- Full new/updated test files
- How to run tests locally (commands)
Constraints:
- Keep tests fast and deterministic
- No network calls beyond localhost
