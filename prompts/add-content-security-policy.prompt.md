---
agent: "application-security-analyst"
name: add-content-security-policy
description: "Help developers design, implement, and safely roll out a new Content-Security-Policy (CSP) for a web application."
---

# 🛡️ Prompt: Add a Content Security Policy (CSP)

---

## Purpose

Create a deployable **Content-Security-Policy** for a specific web application, including an implementation and rollout plan that avoids common CSP footguns.

## How to use

Provide the inputs below (or point me at the relevant files in this repo). If you don’t know an input, say “unknown” and I’ll propose safe defaults plus focused questions.

**Inputs (fill what you can):**

- App type / stack: ${input:stack:Example: Express + React, or ASP.NET Core MVC, or Nginx serving SPA}
- Environments: ${input:envs:Example: dev + staging + prod}
- Where headers are set today: ${input:header_location:Example: Helmet middleware, Nginx, CDN, framework config}
- Existing CSP (if any): ${input:current_csp:Example: Content-Security-Policy: ...}
- Third-party integrations that must load: ${input:third_parties:Example: Google Analytics, Sentry, Stripe, Intercom}
- Known inline scripts/styles (or frameworks that emit them): ${input:inline_needs:Example: inline hydration script, CSS-in-JS, legacy onclick handlers}
- Required network destinations (API, websockets, auth, uploads): ${input:connect_destinations:Example: `https://api.example.com`, `wss://socket.example.com`}
- Embed/iframe needs: ${input:framing:Example: must be embeddable by `https://partner.example`}
- Reporting preference: ${input:reporting:Example: start with Report-Only + report-to endpoint}

## Rules

- You MUST be evidence-first: reference exact file paths and (when possible) line ranges where headers/templates/scripts are configured.
- You MUST NOT recommend `unsafe-inline` or `unsafe-eval` as the primary solution.
- You MUST prefer least-privilege allowlists and explain why each origin/source is needed.
- You MUST include a safe rollout plan (Report-Only → triage → enforce) unless the user explicitly says “enforce immediately”.
- You MUST call out incompatibilities and open questions instead of guessing.

## ✅ Context / Assumptions

- You can read project files in this workspace (server config, reverse proxy/CDN config, HTML templates, frontend build output, docs).
- CSP is **defense-in-depth** against XSS; it does not replace proper output encoding, framework escaping, and avoiding dangerous DOM sinks.
- There may be multiple policies (dev vs prod, per-route, report-only vs enforced). Treat each distinctly.

## 🔍 Procedure

### 1) Identify the delivery point(s)

- Locate where headers are set:
  - App server middleware (e.g., Express/Helmet, ASP.NET middleware)
  - Reverse proxy (e.g., Nginx/Apache)
  - CDN / edge configuration
  - HTML `<meta http-equiv="Content-Security-Policy">` (note limitations; prefer response headers)
- List every place CSP can be added or overridden (including per-route/per-tenant behavior).

### 2) Inventory executable and externally loaded content

- Find all script execution requirements:
  - inline scripts (including SSR hydration bootstraps)
  - inline event handlers (`onclick=`, etc.)
  - dynamic script injection / loaders
  - `eval`, `new Function`, `setTimeout(string)`
  - workers/wasm
- Identify all resource origins required by the app:
  - `script-src`, `style-src`, `img-src`, `font-src`, `connect-src`, `frame-src`, `media-src`, `worker-src`
- Identify third-party services and ensure they’re not serving user-controlled content from allowed origins.

### 3) Choose a CSP strategy: nonce-based, hash-based, or strict static

- Prefer **nonce-based** CSP for apps that must execute inline scripts (modern SSR/CSR patterns).
- Prefer **hash-based** CSP for stable, build-time inline snippets.
- Prefer **no inline execution** (best) when the app can be refactored to external scripts.
- Decide whether to use `strict-dynamic` (often valuable with nonce-based loaders) and document the compatibility tradeoffs.

### 4) Produce an initial Report-Only policy (diagnostic)

- Draft a conservative **Report-Only** policy that is close to the intended enforced policy.
- Add reporting:
  - Prefer `report-to` (Reporting API) where feasible; otherwise use `report-uri`.
  - Ensure reporting endpoints don’t leak secrets and can handle abuse (rate limiting, auth if needed).

### 5) Produce the target enforced policy (deployable)

Include strong baseline directives unless there is evidence they break the app:

- `default-src 'self'`
- `object-src 'none'`
- `base-uri 'none'` (or `'self'` if required)
- `frame-ancestors 'none'` (or explicit allowlist if the app must be framed)
- `script-src` using nonces/hashes; avoid `unsafe-inline` and `unsafe-eval`
- `upgrade-insecure-requests` (and optionally `block-all-mixed-content` if compatible)

### 6) Implementation plan (code/config changes)

- Provide the concrete changes needed to:
  - generate a per-response nonce (unpredictable)
  - attach the nonce to required `<script>` tags
  - ensure caches/CDNs don’t cause nonce mismatch (vary by response; avoid caching HTML with embedded nonces)
  - set the CSP header consistently on all relevant responses

### 7) Verification and rollout

- Manual checks:
  - browser DevTools Console / Network for CSP violations
  - confirm the header is present on key routes
- Automated checks:
  - unit/integration test for header presence and critical directives
  - (if using nonces) test that nonce changes per response
- Rollout steps:
  - ship Report-Only to staging → triage violations → tighten → enforce
  - monitor for regressions; document exceptions with justification

## 📦 Output Format

Return Markdown with the following structure and field names.

### 1) Summary

- Goal:
- Proposed strategy: Nonce-based / Hash-based / No-inline
- Environments covered:
- CSP delivery points found:

### 2) Current State (Evidence)

- Where headers are set (file path + mechanism):
- Existing CSP(s) (exact strings):
- Inline execution sources found:
- Third-party origins required:

### 3) Proposed Policies

- Report-Only header (single line):
- Enforced header (single line):
- Directive rationale (brief bullets per directive/source):

### 4) Required Code/Config Changes

List each change as:

- Change ID:
- File(s):
- What to change:
- Why:
- Risk / rollout notes:

### 5) Risks / Footguns to Avoid

Table columns:

- ID
- Risk
- Evidence
- Impact
- Safer alternative

### 6) Verification Steps

- Local verification:
- Staging verification:
- Production verification:

### 7) Open Questions

- …

## Examples

### Example (Expected Output)

```md
## 1) Summary
- Goal: Add a CSP that blocks inline script execution by default, while allowing required SSR hydration safely.
- Proposed strategy: Nonce-based
- Environments covered: staging → prod
- CSP delivery points found: Express middleware (Helmet) in src/server/securityHeaders.ts

## 3) Proposed Policies
- Report-Only header (single line):
  Content-Security-Policy-Report-Only: default-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; script-src 'self' 'nonce-{RANDOM_PER_RESPONSE}' 'strict-dynamic'; style-src 'self'; img-src 'self' data:; connect-src 'self' https://api.example.com; report-to csp-endpoint

- Enforced header (single line):
  Content-Security-Policy: default-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; script-src 'self' 'nonce-{RANDOM_PER_RESPONSE}' 'strict-dynamic'; style-src 'self'; img-src 'self' data:; connect-src 'self' https://api.example.com; upgrade-insecure-requests

## 4) Required Code/Config Changes
- Change ID: CSP-CHG-01
- File(s): src/server/middleware/securityHeaders.ts
- What to change: Generate a cryptographically-random nonce per HTTP response and set it on res.locals.cspNonce; set CSP header including script-src 'nonce-...'.
- Why: Allows required inline bootstrap scripts to run without enabling unsafe-inline.
- Risk / rollout notes: Ensure HTML responses are not cached at the CDN when they include per-response nonces.

## 6) Verification Steps
- Local verification: Load the home page and confirm no CSP violations; inspect Network → response headers for Content-Security-Policy.
- Staging verification: Enable Report-Only, collect violations for 24–72 hours, then tighten allowlists before enforcing.
- Production verification: Confirm nonce changes per response; monitor CSP report endpoint volume and error rate.
```

## ✅ Quality checks

- Evidence-first: every recommendation references a real location in this repo (file paths + line ranges when possible).
- No guessing: if header injection points or third-party requirements can’t be found, list focused next checks and ask 1–3 questions.
- Least privilege: every allowed source/origin is justified; no broad wildcards unless there’s a documented reason.
- No insecure defaults: do not rely on `unsafe-inline`/`unsafe-eval` as the main path; if mentioned, label as temporary and provide safer alternatives.
- Deployability: include a rollout plan and verification steps; highlight caching/nonce pitfalls explicitly.
