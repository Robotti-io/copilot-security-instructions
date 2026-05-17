---
name: secure-code-review
description: "Perform a repository-grounded secure code review with evidence-first findings, repo-aware prioritization, and remediation guidance for GitHub Copilot users."
---

# Secure Code Review

## Purpose

Provide a durable, evidence-first secure code review workflow for GitHub Copilot users reviewing a repository or PR diff. This skill is designed to produce grounded findings, practical remediation guidance, and a report that can be reused in pull requests, audit notes, or follow-up security work.

## When to use

Use this skill when you need to:

- perform a broad application security review of a repository or PR diff
- inspect changed files first, then expand to adjacent code paths and trust boundaries
- identify security weaknesses in implementation details, configuration, or operational safeguards
- produce prioritized findings with remediation and verification guidance
- summarize what appears strong, what appears risky, and what remains unknown

## Inputs to collect

- repository, folder, or PR diff in scope
- deployable or component type such as API, UI, worker, CLI, infrastructure scripts, or shared library
- deployment and exposure assumptions such as public, partner-reachable, internal-only, admin-only, or multi-tenant
- sensitive data categories such as auth/session data, PII, secrets, payments, regulated data, or internal-only data
- known constraints such as audit requirements, incidents, abuse cases, platform boundaries, or already-known CVEs
- repository evidence from source code, configuration, manifests, IaC, tests, docs, and route or handler declarations

## How to use

1. Review the current repository and current PR diff, if available, before relying on operator answers.
2. Prioritize changed files first when a PR diff is available, then expand to surrounding code paths, shared utilities, and sensitive sinks.
3. Use evidence first and cite file paths and, when possible, line ranges.
4. Mark anything that cannot be confirmed from repository evidence as `ASSUMPTION` or `UNKNOWN`.
5. Ask focused intake questions only when they materially change exposure, trust-boundary interpretation, or prioritization.
6. Do not generate code changes unless explicitly requested.
7. If the environment supports writing files, persist the output as a root-level Markdown file named `Secure Code Review - YYYY-MM-DD.md`.

## Rules

- MUST start from a fresh review of the repository or PR diff in scope.
- MUST prioritize changed files first when a PR diff is available.
- MUST use this evidence hierarchy for factual claims: repo-confirmed, operator-stated, `ASSUMPTION`, `UNKNOWN`.
- MUST keep confirmed facts separate from inference.
- MUST review project structure, entry points, trust boundaries, sensitive assets, and sensitive sinks before finalizing findings.
- MUST explicitly assess the following areas when relevant to the codebase:
  - input validation and injection risk
  - authentication and authorization
  - secrets, configuration, and environment-specific behavior
  - logging, redaction, telemetry, and error handling
  - crypto and token handling
  - deserialization, file handling, upload paths, and path safety
  - SSRF and outbound network calls
  - dependency and supply-chain exposure
- MUST include at least 3 code-anchored findings or clearly state why fewer were justified by the repository evidence.
- MUST include strengths, prioritized findings, code quality notes, a remediation plan, and follow-up validation guidance.
- MUST include actionable verification steps for each material finding.
- MUST avoid recommending disabling security controls as the primary remediation.
- SHOULD trace important flows as `input → validation → authorization → sink`.
- SHOULD call out contradictions between repository evidence and operator statements before finalizing prioritization.
- MAY proceed with explicit `ASSUMPTION` and `UNKNOWN` markers when deployment context is incomplete.

## Step-by-step process

### 1. Triage scope and exposure

- Identify the in-scope application surface, deployables, entry points, and adjacent shared code.
- Classify likely exposure first: public, partner-reachable, mixed, internal-only, or admin-only.
- Capture repo-confirmed versus operator-stated deployment details separately.

### 2. Map the project

- Identify the major files, folders, and subsystems in scope.
- Briefly describe the likely purpose of each major area.
- Identify entry points, trust boundaries, sensitive assets, and sensitive sinks.
- Note where privileged actions or high-consequence workflows appear.

### 3. Identify key subsystems and high-risk flows

Group the code into functional domains such as:

- request routing and controllers
- authentication and authorization
- input parsing and validation
- business logic
- persistence and query layers
- configuration and secret loading
- logging, telemetry, and error handling
- file handling, parsing, and deserialization
- outbound integrations, webhooks, and HTTP clients
- crypto, token, or session handling

For each subsystem:

- summarize what it does
- identify its trust boundaries
- explain why it is or is not high-risk
- trace at least the most important flows as `input → validation → authorization → sink` where possible

### 4. Review high-risk classes

Look for:

- injection risk such as SQL, NoSQL, LDAP, OS command, or template injection
- weak validation, implicit type coercion, and parser ambiguity
- missing or inconsistent authn/authz checks
- broken object-level authorization, tenant isolation gaps, or confused deputy patterns
- hardcoded secrets, dangerous defaults, or insecure environment-dependent behavior
- logging of tokens, credentials, cookies, headers, bodies, or PII
- verbose errors or telemetry that leak sensitive context
- weak randomness, insecure crypto, or token validation mistakes
- unsafe deserialization, path traversal, archive extraction risk, or upload abuse
- user-controlled outbound requests, weak webhook validation, or SSRF paths
- risky dependency usage, unsafe scripts, or supply-chain exposure

### 5. Capture strengths and code quality issues

Call out meaningful strengths such as:

- centralized validation
- consistent authorization guards
- safe parameterization
- structured redaction
- strong secret handling
- environment-aware hardening
- clear privilege separation

Also note maintainability issues that materially affect security posture, such as duplicated auth logic, inconsistent validation, brittle config loading, or scattered logging behavior.

### 6. Prioritize findings

Focus on findings that are:

- grounded in actual repository evidence
- realistic in impact and exploitability
- specific enough for an engineer to fix
- useful to a pull request reviewer or security owner

For each material finding, include:

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

Where useful, also include:

- **Prerequisites**
- **Reproduction path**
- **Compensating controls**
- **Why this may be safer in practice**

### 7. Close with a remediation plan

Organize next steps into:

- **Quick wins (hours)**
- **Medium fixes (days)**
- **Structural guardrails (weeks)**

Examples of structural guardrails:

- shared validation helpers
- centralized authorization policy checks
- redaction middleware
- safer outbound request wrappers
- secret scanning
- security-focused tests
- CI linting or SAST rules for recurring patterns

## Output format

Produce PR-comment-ready Markdown in chat.

If the environment supports writing files, also write:

`./Secure Code Review - YYYY-MM-DD.md`

The report MUST include these sections:

1. Executive summary
2. Scope and assumptions
3. Strengths
4. Prioritized findings
5. Code quality notes
6. Remediation plan
7. Suggested follow-up validation
8. Open questions

### Executive summary

- 5-10 bullets
- what was reviewed
- what appears strong
- what appears risky
- major unknowns
- immediate next actions

### Scope and assumptions

Include:

- in-scope components
- out-of-scope components if relevant
- PR diff reviewed or not reviewed
- deployment assumptions
- sensitive data or trust boundaries
- evidence limitations
- `ASSUMPTION` and `UNKNOWN` items that materially affect risk interpretation

### Strengths

Use bullets tied to repository evidence.

### Prioritized findings

Repeat this structure for each material finding:

- **Title**
- **Severity**
- **Confidence**
- **Category**
- **Where**
- **Risk**
- **Impact**
- **Evidence**
- **Recommendation**
- **Verification**

### Code quality notes

Capture non-vulnerability issues that materially affect security posture.

### Remediation plan

Split into:

- quick wins
- medium fixes
- structural guardrails

### Suggested follow-up validation

Include targeted tests, abuse-case checks, log review, authz regression coverage, dependency review, or secret scanning as appropriate.

### Open questions

List unresolved questions with likely owner or location to confirm.

## Quality checks

- findings are grounded in repository evidence rather than generic advice
- changed files were prioritized when a PR diff was available
- strengths and weaknesses are both covered
- each finding includes `Where` and `Evidence`
- severity is proportionate to exploitability and impact
- verification steps are actionable
- logging/redaction, secrets/config, access control, and environment-specific behavior were explicitly considered
- evidence and inference are clearly separated
