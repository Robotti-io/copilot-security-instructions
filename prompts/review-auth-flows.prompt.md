---
agent: "application-security-analyst"
name: review-auth-flows
description: "Review authentication flows for common weaknesses and mitigations."
---

# 🧪 Prompt: Authentication Flow Review

## ✅ Context / Assumptions

- You can read project files in this workspace.
- Prefer evidence-first: cite file paths and (when possible) line ranges.
- Do **not** modify files; report findings and mitigations only.

## 🔍 Procedure

1. Identify auth entry points:
    - login routes, session/token issuance, callback endpoints, middleware.
2. Trace authentication decisions:
    - where identity is established, stored, and checked.
3. Check common authn risks:
    - missing auth on protected resources
    - weak session/JWT validation (issuer/audience/exp/alg)
    - CSRF weaknesses for cookie-based auth
    - missing rate limiting / lockout
    - token leakage via logs/URLs/frontend
4. Check secure defaults:
    - short-lived tokens + refresh pattern
    - server-side sessions with expiry
    - secure cookies (`HttpOnly`, `Secure`, `SameSite`)
5. Recommend mitigations and verification tests.

## 📦 Output Format

Return Markdown with:

- **Summary**: top 3 issues + overall auth risk
- **Flow map**: bullets of login/session/token lifecycle
- **Findings** (repeat):
  - **Issue**:
  - **Severity / Likelihood**:
  - **Where**:
  - **Evidence**:
  - **Recommendation**:
  - **Verification**:

## ✅ Quality checks

- Findings distinguish between cookie-session vs bearer-token behavior.
- Claims include concrete code locations.
- Recommendations include a verification step (test/request).
