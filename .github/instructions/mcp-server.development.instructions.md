---
applyTo: "src/**/*.js,tests/**/*.js,package.json"
---

# MCP server development rules (this repo)

These rules apply to changes under `src/` and related MCP server tests.

## Core standards
- Prefer **minimal diffs** and incremental improvements.
- Avoid breaking existing tool names/behaviors unless explicitly intended.
- Every behavior change MUST include a verification step (test or curl reproduction).

## Express / HTTP handling
- Request bodies MUST be parsed safely:
  - use explicit JSON parsing middleware
  - set a reasonable size limit for JSON bodies
- Validate content negotiation:
  - MCP endpoints should check `Accept` headers as appropriate for the endpoint behavior.
- Error handling MUST be consistent:
  - do not expose internal stack traces to clients
  - return clear status codes and brief error messages

## MCP tools
- Every MCP tool MUST have:
  - stable tool name (choose and keep a consistent naming convention across tools)
  - title + description
  - zod input schema (even if empty)
  - deterministic output shape
- Do not return raw secrets or dump large file contents by default.

## Logging hygiene
- Do not log raw request bodies.
- If logging headers, redact authorization-like fields.
- Prefer structured logs with `source` and request id (when available).

## Testing
- Add or update tests when:
  - endpoint behavior changes
  - new tools are added
  - error handling changes
- Tests MUST be deterministic and fast.

## Output requirements for Copilot edits
When generating patches:
- Output full file contents for modified files in fenced `md` blocks.
- Include a short verification checklist (commands + expected results).
