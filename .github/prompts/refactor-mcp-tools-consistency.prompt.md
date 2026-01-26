---
agent: "mcp-tool-author"
name: refactor-mcp-tools-consistency
description: "Normalize MCP tool naming, schemas, and outputs across src/mcp_tools without changing behavior."
---

Goal: Make MCP tools consistent without changing their external behavior.

Checks:
- Tool names: consistent separator/casing (choose a convention and apply consistently)
- Titles/descriptions: clear and action-oriented
- Input schemas: use zod; avoid untyped/implicit inputs
- Output: deterministic formatting; avoid ad-hoc strings when JSON is intended
- Logging: consistent fields; avoid logging raw bodies/secrets

Output:
- Proposed convention
- List of tools that need updates
- Patches (full file contents) for each changed file
- Verification checklist
