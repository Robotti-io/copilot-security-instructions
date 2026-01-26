---
name: secrets-and-logging-hygiene
description: Workflow for preventing secret leaks and sensitive logging (PII/credentials) and adding redaction defaults.
---

# Secrets and Logging Hygiene

## When to use

Use this skill when asked to **scan for secrets**, harden logging, or reduce sensitive data exposure.

## Inputs to collect (if available)

- Data classification (PII, auth/session, payments)
- Logging/telemetry stack (logger, APM, sinks)
- Secret management approach (vault, env injection, KMS)
- Incident/audit requirements (retention, access controls)

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

## Output format

- **Leak points found** (table): Type | Where | Evidence | Risk
- **Redaction policy**: defaults + allow-listed fields
- **Guardrails**: CI secret scanning, pre-commit, tests
- **Verification**: how to confirm redaction and rotation

## Examples

- “Authorization header logged” → redact `Authorization` and cookies by default; verify logs no longer contain bearer tokens.
