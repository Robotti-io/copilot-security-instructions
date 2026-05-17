---
name: secure-code-review
description: "Repository-grounded secure code review workflow that produces prioritized findings, remediation guidance, and verification steps."
---

# Secure Code Review

## Purpose

Provide a repeatable, evidence-first application security review workflow for a repository or PR diff.

## When to use

Use this skill when you need to:

- review code for security issues
- assess a repository or PR diff for application security risk
- produce prioritized findings and fix guidance
- identify trust boundaries, sensitive data flows, and risky implementation patterns

## Inputs to collect

- repository, folder, or PR diff in scope
- component type such as API, UI, worker, CLI, infrastructure scripts, or shared library
- data sensitivity such as auth/session data, PII, payments, secrets, or internal-only data
- deployment assumptions such as internet-facing, internal-only, admin-only, or multi-tenant
- known incidents, audit requirements, abuse cases, or CVEs, if available

## How to use

1. Start from a fresh read of the current workspace and current PR diff, if available.
2. Prioritize changed files first when a PR diff is available, then expand repo-wide where needed.
3. Prefer evidence-first analysis and cite file paths and, when possible, line ranges.
4. Keep confirmed evidence separate from inference, and label uncertainty as `ASSUMPTION` or `UNKNOWN`.
5. Do not modify files unless explicitly asked.
6. If the environment supports writing files, persist the output as a root-level Markdown file named `Secure Code Review - YYYY-MM-DD.md`.

## Rules

- MUST begin with a fresh review of the repository or PR diff in scope.
- MUST prioritize changed files first when a PR diff is available.
- MUST keep findings tied to repository evidence such as source code, config, manifests, IaC, docs, and tests.
- MUST distinguish confirmed evidence from `ASSUMPTION` and `UNKNOWN`.
- MUST review project structure, entry points, trust boundaries, sensitive assets, and sensitive sinks before finalizing findings.
- MUST explicitly assess at least these areas when relevant to the codebase:
  - input validation and injection risk
  - authentication and authorization
  - secrets, configuration, and environment-specific behavior
  - logging, redaction, and error handling
  - crypto and token handling
  - deserialization, file handling, and path safety
  - SSRF and outbound network calls
  - dependency and supply-chain exposure
- MUST include strengths, prioritized findings, code quality notes, and a remediation plan.
- MUST include actionable verification steps for each material finding.
- MUST avoid recommending weaker "turn it off" style mitigations as the primary fix.
- SHOULD trace important flows as `input → validation → authorization → sink`.
- SHOULD prefer concise code excerpts or logic summaries over long pasted snippets.
- MAY continue with explicit `ASSUMPTION` and `UNKNOWN` markers when deployment context is missing.

## Step-by-step process

1. **Map the project**
   - Identify the major files, folders, and subsystems in scope.
   - Describe the likely purpose of each major area.
   - Identify entry points, trust boundaries, sensitive assets, and sensitive sinks.
2. **Identify key subsystems**
   - Group the code into functional domains such as routing, auth, validation, business logic, persistence, config, logging, integrations, and crypto/session handling.
   - For each subsystem, explain what it does, why it is or is not high-risk, and where trust boundaries appear.
3. **Review high-risk classes**
   - Injection, unsafe parsing, and type confusion
   - Authn/authz failures and insecure defaults
   - Secrets exposure and dangerous configuration behavior
   - Sensitive logging, missing redaction, and verbose error handling
   - Weak randomness, insecure hashing, or token validation mistakes
   - Unsafe deserialization, path traversal, and upload risk
   - SSRF and unsafe outbound fetch behavior
   - Risky dependency usage or supply-chain patterns
4. **Deep-dive the highest impact flows**
   - Trace important flows from input to validation to authorization to sensitive action.
   - Look for checks performed too late, inconsistent enforcement, hidden alternate paths, or controls applied in one path but missing in another.
5. **Write prioritized findings**
   - Focus on security-relevant, evidence-grounded findings with realistic impact and exploitability.
   - Also call out meaningful strengths and code quality issues that materially affect security posture.
6. **Close with a remediation plan**
   - Organize recommendations into quick wins, medium fixes, and structural guardrails.

## Output format

Produce a Markdown report with these sections:

1. Scope and assumptions
2. Strengths
3. Prioritized findings
4. Code quality notes
5. Remediation plan
6. Suggested follow-up validation

For each finding, include:

- **Title**
- **Severity**: Critical / High / Medium / Low / Informational
- **Confidence**: High / Medium / Low
- **Category**
- **Where**
- **Risk**
- **Impact**
- **Evidence**
- **Recommendation**
- **Verification**

## Repo integration (optional)

If the project includes companion prompts under `.github/prompts/`, use them to deepen or focus the review where relevant:

- `.github/prompts/secure-code-review.prompt.md`
- `.github/prompts/scan-for-insecure-apis.prompt.md`
- `.github/prompts/validate-input-handling.prompt.md`
- `.github/prompts/review-auth-flows.prompt.md`
- `.github/prompts/check-for-secrets.prompt.md`
- `.github/prompts/assess-logging.prompt.md`
