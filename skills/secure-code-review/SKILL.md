---
name: secure-code-review
description: Repeatable process for an application security code review that produces prioritized findings and fix guidance.
---

Use this skill when asked to **review code for security**, produce findings, or prepare guidance for remediation.

## Inputs to collect (if available)

- What component(s) are in scope (API, UI, worker, infra scripts)
- Data sensitivity (PII, auth/session, payments)
- Deployment assumptions (internet-facing, internal, multi-tenant)
- Any known incidents, CVEs, or audit requirements

## Step-by-step process

1. **Map entry points & trust boundaries**
   - Enumerate request handlers, background consumers, file parsers, template renderers, and admin endpoints.
   - Identify where untrusted input crosses into privileged actions or sensitive sinks.
2. **Scan for high-risk classes**
   - Injection: SQL/NoSQL/LDAP/OS/template
   - Authn/authz: missing checks, insecure defaults, confused deputy
   - Deserialization & file handling: unsafe loads, path traversal, upload
   - Crypto: homegrown crypto, weak randomness, token validation mistakes
   - Logging: secrets/PII exposure, overly verbose errors
   - SSRF: URL fetchers, webhook validation gaps
3. **Deep-dive the highest impact areas**
   - Trace data flow from input → validation → authorization → sink.
   - Look for missing allow-lists, type confusion, and implicit conversions.
4. **Write findings in a consistent format**
   - Title, severity, confidence
   - Where (file/function)
   - Risk + prerequisites
   - Repro steps
   - Recommendation + verification steps
5. **Close with a remediation plan**
   - Quick wins (hours), medium fixes (days), structural guardrails (weeks).

## Output template

### Summary

- Scope reviewed:
- Top issues:
- Overall risk: Low / Medium / High / Critical

### Findings (repeat)

- **Title**
- **Severity / Confidence**
- **Where**
- **Risk**
- **Repro**
- **Recommendation**
- **Verification**

## Repo integration (optional)

If this repo includes prompt files under `/prompts`, the following are commonly relevant:

- `secure-code-review.prompt.md`
- `scan-for-insecure-apis.prompt.md`
- `validate-input-handling.prompt.md`
- `review-auth-flows.prompt.md`
