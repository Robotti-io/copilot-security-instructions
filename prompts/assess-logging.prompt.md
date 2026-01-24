---
agent: "application-security-analyst"
name: assess-logging
description: "Audit logging for sensitive data exposure."
---

# 🕵️ Prompt: Logging & Sensitive Data Exposure Audit

## ✅ Context / Assumptions

- You can read project files in this workspace.
- Prefer evidence-first: cite file paths and (when possible) line ranges for each claim.
- Do **not** modify files; report findings and recommendations only.
- Do not echo secrets or sensitive values in your output (redact samples).

## 🔍 Procedure

1. Identify logging entry points (logger wrappers, middleware, request/response logging, error handlers).
2. Identify sensitive sources:
    - Credentials, tokens, API keys, session IDs
    - `Authorization`/cookies, CSRF tokens
    - PII (emails, phone, address, IDs)
3. Trace sources → sinks:
    - Logs, telemetry, exception/stack traces, debug output
4. Flag unsafe patterns:
    - Full request/response bodies or headers without allow-listing
    - Stack traces or exception objects that include sensitive context
    - Console/print statements in production paths
    - Insecure log transport or overly broad log destinations
5. Recommend safe alternatives:
    - Structured logging + allow-listed fields
    - Redaction filters (headers/cookies/tokens)
    - Data minimization defaults

## 📦 Output Format

Return Markdown with this structure:

- **Summary**: top 3 risks + overall risk (Low/Medium/High/Critical)
- **Findings** (repeat):
  - **Issue**:
  - **Severity / Likelihood**:
  - **Where**: file path + symbol/function
  - **Evidence**: file path (+ line range if available)
  - **Recommendation**:
  - **Verification**: how to test the fix / what to confirm
- **Suggested redaction policy**: bullet list of default redactions and allowed fields

## ✅ Quality checks

- Every finding includes **Where** + **Evidence**.
- Output does not include raw secrets/PII.
- Recommendations do not rely on “turn off logging” or “disable security controls” as the primary fix.
