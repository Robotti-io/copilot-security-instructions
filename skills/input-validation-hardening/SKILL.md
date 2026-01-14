---
name: input-validation-hardening
description: Process for tightening input validation, canonicalization, and safe parsing to prevent injection and logic abuse.
---

Use this skill when asked to **validate inputs**, harden request parsing, or prevent injection/abuse.

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
