---
name: secrets-and-logging-hygiene
description: Workflow for preventing secret leaks and sensitive logging (PII/credentials) and adding redaction defaults.
---

Use this skill when asked to **scan for secrets**, harden logging, or reduce sensitive data exposure.

## Step-by-step process

1. **Identify sensitive data**
   - Credentials, tokens, API keys, connection strings
   - PII (emails, phone, addresses), financial identifiers
2. **Locate sources and sinks**
   - Sources: env, config, secrets managers, request payloads
   - Sinks: logs, telemetry, error pages, analytics, support dumps
3. **Harden logging**
   - Default to structured logs
   - Redact known patterns (Authorization headers, cookies, tokens)
   - Avoid logging full request/response bodies by default
4. **Prevent secret introduction**
   - Replace hardcoded strings with env/secret manager references
   - Add guardrails: git hooks, CI secret scanning, unit tests for redaction
5. **Verify**
   - Add tests ensuring redaction occurs
   - Run a lightweight grep for common secret patterns and known keys

## Output

- List of leak points found (if any)
- Recommended redaction policy + implementation location
- Tests and verification steps

## Repo integration (optional)

Related prompts:

- `check-for-secrets.prompt.md`
- `assess-logging.prompt.md`
