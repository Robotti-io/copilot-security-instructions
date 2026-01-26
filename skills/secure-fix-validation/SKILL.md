---
name: secure-fix-validation
description: Standard validation checklist to prove a security fix works and doesn’t regress behavior.
---

# Secure Fix Validation

## When to use

Use this skill after implementing a security fix, or when reviewing a PR.

## Inputs to collect (if available)

- Vulnerability description and expected secure behavior
- Repro steps (request, payload, or test)
- Affected components and entry points
- Deployment/rollout constraints (feature flags, backwards compatibility)

## Step-by-step process

1. **Reproduce the issue pre-fix**
   - Minimal failing test or request example
2. **Verify the fix**
   - Confirm the repro now fails safely
3. **Regression coverage**
   - Add unit/integration tests for:
     - expected valid inputs
     - malicious/edge inputs
     - authorization bypass attempts (if relevant)
4. **Non-functional checks**
   - Error handling (no stack traces/secret leakage)
   - Logging redaction (no PII/secrets)
   - Performance impact in hot paths
5. **Rollout safety**
   - Feature flags where appropriate
   - Backwards compatibility notes
   - Monitoring/alerts to detect new failure modes

## Output

- Commands run
- Tests added/updated
- Verification evidence (logs/screenshots/snippets)
- Rollout notes

## Output format

- **Repro (pre-fix)**: how it failed
- **Verification (post-fix)**: what now happens
- **Tests**: added/updated + what they cover
- **Evidence**: logs/screenshots/snippets (redacted)
- **Rollout notes**: monitoring, flags, compatibility

## Examples

- “Fix: block IDOR on /users/:id” → add negative test for cross-user access; verify 403 and tenant scoping on DB query.
