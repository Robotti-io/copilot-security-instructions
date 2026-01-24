---
name: input-validation-hardening
description: Process for tightening input validation, canonicalization, and safe parsing to prevent injection and logic abuse.
---

## When to use

Use this skill when asked to **validate inputs**, harden request parsing, or prevent injection/abuse.

## Inputs to collect (if available)

- Entry points (HTTP endpoints, consumers, file parsers)
- Data sensitivity and trust boundaries
- Existing validation libraries/patterns in the codebase
- Known attack/abuse cases (payloads, bypass attempts)

## Step-by-step process

1. **Inventory inputs**
   - HTTP params/body/headers, file uploads, message payloads, env vars, CLI args
2. **Define schemas**
   - Prefer typed schemas (DTOs) and allow-lists
   - Enforce length, charset, ranges, and required fields
3. **Canonicalize early**
   - Normalize encoding, trim, and apply consistent parsing (dates, IDs, enums)
4. **Validate before use**
   - Reject unknown fields if possible
   - Ensure IDs map to authorized resources (ownership/tenant checks)
5. **Protect sinks**
   - Parameterize DB queries
   - Avoid dynamic execution (eval, shell, template injection)
6. **Add tests**
   - Boundary tests (min/max), malformed inputs, and common payloads

## Output

- Proposed schema(s)
- Where to enforce validation (middleware/controller boundary)
- Tests added/updated

## Repo integration (optional)

Related prompts:

- `validate-input-handling.prompt.md`
- `scan-for-insecure-apis.prompt.md`

## Output format

- **Inventory**: inputs and boundaries
- **Proposed schema(s)** (high-level)
- **Enforcement point**: where validation should occur
- **Test plan**: boundary + malicious inputs

## Examples

- “Public JSON API” → reject unknown fields, enforce max sizes, and add negative tests for type confusion and oversized payloads.
