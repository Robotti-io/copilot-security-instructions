---
name: authn-authz-review
description: Workflow to review authentication and authorization flows (sessions, tokens, RBAC/ABAC) and produce fix guidance.
---

## When to use

Use this skill when reviewing **login, session management, token validation, or authorization checks**.

## Inputs to collect (if available)

- Auth model (session cookie vs bearer token vs mTLS)
- Deployment assumptions (internet-facing, internal-only, multi-tenant)
- Sensitive assets (PII, admin actions, money movement)
- Known roles/scopes/claims and intended policies

## Step-by-step process

1. **Identify identities and trust boundaries**
   - Who is the user/service? How is identity asserted (cookie, bearer token, mTLS)?
   - Where does authorization decision happen? Where is it enforced?
2. **Authentication checks**
   - Password handling: hashing, rate limits, lockouts, MFA hooks
   - Session/token: issuance, expiry, rotation, revocation, audience/issuer validation
   - Transport: TLS-only, secure cookie flags, CSRF defenses for cookie auth
3. **Authorization checks**
   - Define resources + actions (e.g., `invoice:read`, `admin:user:delete`)
   - Ensure checks are **server-side** and close to the boundary
   - Watch for IDOR: user-controlled identifiers without ownership checks
4. **Multi-tenant & privilege boundaries**
   - Tenant scoping on every query
   - Admin vs user code paths; "act as" features
5. **Abuse cases**
   - Replay, token substitution, privilege escalation, forced browsing
6. **Deliver fixes**
   - Centralize policy decisions (middleware/service)
   - Add negative tests for bypass attempts

## Output checklist

- Token/session validation requirements
- Required claims/roles/scopes
- Authorization enforcement points
- Test cases to prevent bypass

## Repo integration (optional)

Related prompts:

- `review-auth-flows.prompt.md`
- `check-access-controls.prompt.md`

## Output format

- **Summary**: scope + top 3 risks + overall risk
- **Findings** (repeat): issue, severity/likelihood, where, evidence, recommendation, verification
- **Policy checklist**: required claims/roles/scopes + enforcement points

## Examples

- “Cookie session app” → verify `HttpOnly/Secure/SameSite`, CSRF defenses, and session rotation on privilege change.
