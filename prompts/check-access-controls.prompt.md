# 🔒 Prompt: Access Control & Authorization Review

## ✅ Context / Assumptions

- You can read project files in this workspace.
- Prefer evidence-first: cite file paths and (when possible) line ranges.
- Do **not** modify files; report findings and recommendations only.
- Assume attackers can tamper with client-side state; require server-side enforcement.

## 🔍 Procedure

1. Identify authn/authz boundaries:
    - middleware/guards, policy helpers, route handlers/controllers, service methods.
2. Enumerate protected resources and actions (read/write/admin operations).
3. Look for common access control failures:
    - missing authn on protected endpoints
    - missing authz (IDOR, tenant bypass, role bypass)
    - inconsistent checks across similar endpoints
    - hardcoded role strings without central policy
4. Verify object-level authorization:
    - ownership checks, tenant scoping, subject/param matching.
5. Recommend a consistent enforcement pattern (middleware/policy layer) and verification tests.

## 📦 Output Format

Return Markdown with:

- **Summary**: top 3 issues + overall risk
- **Findings** (repeat):
  - **Issue**:
  - **Severity / Likelihood**:
  - **Where**: file path + symbol
  - **Evidence**: file path (+ line range if available)
  - **Recommendation**:
  - **Verification**: negative test/bypass attempt to prove it’s fixed
- **Consistency checklist**: bullets of “must be present everywhere” checks

## ✅ Quality checks

- Each finding includes object-level detail when applicable (which identifier can be abused).
- Claims are backed by specific code locations.
- Recommendations avoid “security through obscurity” (e.g., hiding endpoints) as a primary control.
