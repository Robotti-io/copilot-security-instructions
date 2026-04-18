---
name: access-control-review
description: "Analyze repository-grounded identity, access control, and authorization design with evidence-first reporting and script-validated Mermaid diagrams."
---

# Access Control Review

## Purpose

Provide a repeatable, repository-grounded workflow for reviewing identity, access control, and authorization architecture, then producing durable Markdown output with validated Mermaid diagrams using local Node.js helper scripts instead of VS Code extension-based Mermaid tools.

## When to use

Use this skill when you need to:

- analyze how identity, access control, and authorization are implemented across a repository or PR diff
- map roles, groups, permissions, claims, scopes, and policies to concrete enforcement points
- build an endpoint-to-access-control view grounded in repository evidence
- produce a Markdown review plus Mermaid diagrams that can be validated from a CLI-friendly workflow

## Inputs to collect

- repository or PR diff in scope
- authentication source and identity provider details, if known
- principal types that matter for the review, such as end users, administrators, support users, service identities, and background jobs
- known sources of truth for groups, roles, permissions, claims, scopes, or policy assignments
- environment or tenant-specific variance, if any
- repository evidence from code, config, IaC, manifests, docs, route declarations, tests, and policy definitions

## How to use

1. Review the current repository and PR diff, if available, before relying on operator answers.
2. Persist the output as a root-level Markdown file named `Access Control Architecture Review - YYYY-MM-DD.md` when the environment supports writing files.
3. Use evidence first and cite file paths and, when possible, line ranges.
4. Mark anything that cannot be confirmed from repository evidence as `ASSUMPTION` or `UNKNOWN`.
5. Perform the mandatory intake before finalizing the report, choosing only the questions that materially change the interpretation of identity source, authorization model, source of truth, enforcement location, or environment behavior.
6. Use the local Mermaid helper scripts in this skill instead of VS Code extension-based Mermaid tools.
7. Validate every Mermaid diagram before finalizing the report.
8. Do not generate code changes unless explicitly requested.

## Rules

- MUST keep claims tied to repository evidence such as source code, configuration, manifests, IaC, tests, and route declarations.
- MUST distinguish between confirmed evidence, `ASSUMPTION`, and `UNKNOWN`.
- MUST ask focused intake questions only when they materially change the interpretation of the access control design.
- MUST perform a short pre-report intake before producing the final report.
- MUST include validated Mermaid diagrams unless Mermaid rendering is unsupported.
- MUST use the local helper scripts under `plugins/copilot-security/skills/access-control-review/scripts/` for Mermaid guidance and validation.
- MUST not output a Mermaid diagram that has not passed validation.
- MUST distinguish identity source, access metadata, enforcement point, source of truth, and runtime decision path.
- MUST not treat UI-only controls as sufficient authorization.
- MUST review alternate execution paths such as internal APIs, admin tools, support impersonation, background jobs, message consumers, webhooks, GraphQL resolvers, and file import or export flows.
- SHOULD prefer simple Mermaid constructs and diagram types such as `flowchart` and `sequenceDiagram`.
- MAY continue with explicit `ASSUMPTION` and `UNKNOWN` markers when questions remain unanswered.

## Step-by-step process

### 1. Mission and scope

Produce these durable artifacts:

1. A repository-grounded Markdown report describing the application authorization architecture.
2. Validated Mermaid diagrams showing the identity and access control model.
3. An endpoint-to-access-control mapping.
4. A concise PR-ready summary.

Use the review to answer questions such as:

- how users and services authenticate
- which groups, roles, permissions, claims, or policies exist
- where they are defined
- where and how access is enforced
- which endpoints, actions, background jobs, and admin flows require which access controls
- whether controls are centralized, duplicated, inconsistent, or bypassable
- where access decisions are delegated to infrastructure, framework policy, middleware, or application code
- whether LDAP or AD groups, SSO groups, JWT claims, app roles, scopes, permissions, or policy names are mapped consistently

### 2. Context and assumptions

- Review the current repository and current PR diff if available.
- Prefer evidence-first analysis.
- Cite file paths and, when possible, line ranges.
- Tie claims to source code, config, IaC, manifests, docs, tests, route declarations, and policy definitions.
- If something cannot be confirmed from repository evidence, label it as `ASSUMPTION` or `UNKNOWN`.
- Ask 2-5 focused questions only if they materially change interpretation of authentication source, identity provider, group or role source of truth, runtime enforcement location, or environment-specific policy behavior.

### 3. Mandatory pre-report intake

Before producing the final report, perform a short intake to reduce ambiguity around identity source, authorization model, and enforcement location.

Ask 4-8 concise questions, chosen based on repository evidence, and prioritize the questions most likely to change the interpretation of the access control design.

#### Stage 1: Identify identity source and authentication model

Ask 1-3 concise questions to classify how principals are established. Prioritize:

1. Which identity sources are used?
   - local accounts
   - corporate directory, LDAP, or Active Directory
   - SSO, OIDC, or SAML
   - external customer identity
   - service accounts or workload identity
   - API keys
   - mTLS or machine identity
   - mixed
2. Which principal types should be analyzed?
   - end users
   - administrators
   - support users
   - service-to-service callers
   - batch jobs or schedulers
   - CI/CD or automation identities
3. Are group memberships, roles, or claims resolved in the identity provider, at login or token issuance, via directory lookup at runtime, from an internal database, from configuration or static mapping, or from policy code?

#### Stage 2: Classify authorization model

Ask 1-2 questions that determine how access decisions are intended to work. Prioritize:

1. Which authorization styles are intended?
   - RBAC
   - ABAC
   - policy-based authorization
   - claims-based authorization
   - ACL or resource ownership
   - scope-based API authorization
   - custom business-rule authorization
   - mixed
2. Which access concepts exist in the intended design?
   - LDAP or AD groups
   - SSO groups
   - app roles
   - claims
   - scopes
   - permissions
   - policy names
   - entitlements
   - tenant or organization membership
   - feature flags used as access gates

#### Stage 3: Locate enforcement and bypass risk

Ask 1-2 questions to understand where checks are actually enforced. Prioritize:

1. Where should authorization be enforced?
   - edge or gateway
   - middleware
   - route or controller annotations
   - service layer
   - domain or business logic
   - database row filters or stored procedures
   - background job workers
   - UI only
   - mixed
2. Are there known exceptions, bypass paths, or alternate execution paths such as internal APIs, admin tools, support impersonation, webhooks, background jobs, message consumers, GraphQL resolvers, file import or export flows, or direct data access paths?

#### Stage 4: Confirm source of truth and environment variance

1. What is the expected source of truth for access assignments?
   - directory groups
   - IdP groups or claims
   - application database
   - deployment config
   - IaC or platform policy
   - hard-coded mapping
   - mixed
2. Do role, group, or permission mappings differ by environment or tenant?

#### Intake rules

- Ask only the questions most likely to change the final architecture mapping.
- Use repository evidence first.
- If unanswered, continue with explicit `ASSUMPTION` and `UNKNOWN` markers.
- Distinguish clearly between identity source, access metadata, enforcement point, source of truth, and runtime decision path.

### 4. Mermaid helper workflow

For every Mermaid diagram you include:

1. Pick the correct diagram type.
   - consult the helper docs script before drafting the diagram type
2. Draft minimal syntax.
   - prefer simple, reliable Mermaid constructs
3. Validate.
   - run the validator script
   - fix and re-validate until it passes

Mermaid reliability rules:

- always start with a valid diagram header
- do not mix diagram grammars
- keep node IDs simple and alphanumeric or underscore-based
- put complex text in labels, not IDs
- quote edge labels if they contain special characters
- use unique node IDs
- prefer `flowchart` and `sequenceDiagram` unless another type is clearly supported

### 5. Triage and inventory

Identify likely evidence sources such as:

- route declarations
- controllers, handlers, and resolvers
- middleware, filters, guards, and interceptors
- authorization decorators, annotations, and attributes
- policy providers and handlers
- auth configuration
- LDAP, AD, OIDC, SAML, and JWT configuration
- role and permission enums and constants
- database tables related to users, roles, groups, permissions, memberships, and grants
- IaC or deployment config affecting authn or authz
- tests asserting authorization behavior
- admin and support tooling
- import and export flows
- background job consumers and message handlers

Produce a short inventory list with evidence links.

### 6. Identify identity model

Determine, with evidence where possible:

- authentication mechanisms in use
- identity providers or directory integrations
- principal types
- token or session contents relevant to authorization
- group, role, or permission resolution path
- whether LDAP or AD groups are used directly or mapped into application roles or claims
- whether identity and authorization metadata are static, configuration-driven, or data-driven

### 7. Identify authorization model

Determine:

- which authorization paradigms are present, such as RBAC, ABAC, PBAC, claims, scopes, resource ownership checks, tenant boundary checks, feature-flag-based gating, or mixed approaches
- the named roles, groups, permissions, scopes, claims, or policies discovered
- where they are defined
- whether there is a single source of truth or fragmented sources
- whether roles or groups are broad business labels or precise permission bundles
- whether access is coarse-grained, fine-grained, or inconsistent

### 8. Map enforcement points

For each major entry point and action path, identify where access is checked:

- edge or gateway
- middleware
- route, controller, decorator, attribute, or annotation
- service layer
- domain logic
- repository or data-access layer
- UI-only checks
- job worker, consumer, or scheduler path

For each enforcement point, determine whether it appears centralized, duplicated, missing, inconsistent, bypassable, dependent on client behavior, or dependent on naming convention rather than durable policy logic.

### 9. Build endpoint and action mapping

Create a mapping for:

- HTTP endpoints
- GraphQL operations
- RPC methods
- message consumers
- background jobs
- admin and support actions
- export and import flows

For each, capture where possible:

- route or action name
- principal type
- required role, group, permission, policy, claim, or scope
- enforcement location
- evidence
- confidence
- whether protection is explicit, inherited, indirect, or missing

### 10. Detect architecture weaknesses and authorization drift

Look specifically for:

- missing authorization on sensitive endpoints
- UI-only authorization
- inconsistent policy names
- role explosion or ambiguous role semantics
- hard-coded role strings scattered through code
- stale or unused permissions
- broad wildcard or admin grants
- support or admin impersonation risk
- privilege escalation paths
- missing tenant or resource ownership checks
- confused deputy behavior
- direct object reference exposure
- inconsistent group-to-role mapping
- environment-specific drift
- hidden alternate paths through jobs, webhooks, or internal APIs

### 11. Produce diagrams

Include these diagrams unless Mermaid rendering is unsupported:

1. Identity and Access Control Overview
   - identity sources
   - token, session, or claims path
   - group, role, and permission mapping
   - major enforcement points
   - trust boundaries where relevant
2. Authorization Enforcement Architecture
   - major subsystems
   - entry points
   - middleware, filters, and guards
   - policy engines and providers
   - service or domain enforcement
   - datastore lookups
   - external group or directory dependencies
3. Endpoint-to-Policy or Role Mapping View
   - use a diagram that makes major protected surfaces visible
   - group similar endpoints when necessary for readability
4. Top 2-3 Sequence Diagrams
   - highest-risk or most important auth flows such as login and claims resolution, privileged admin action, export or reporting action, service-to-service authorization, or support impersonation flow

Optional diagrams:

- LDAP or AD group mapping view
- tenant or organization access model
- data classification vs authorization boundary map
- deployment or runtime auth boundary view

### 12. Evaluate control maturity

For key access-control concerns, identify whether controls are `PRESENT`, `ABSENT`, or `UNKNOWN`.

Examples include:

- centralized policy enforcement
- least-privilege role design
- separation of duties
- admin action protection
- support impersonation controls
- service identity scoping
- tenant isolation checks
- export and download restrictions
- audit logging for authorization decisions or privileged actions
- deny-by-default behavior
- test coverage for authorization rules

When marked `PRESENT`, provide evidence.

### 13. Build a validation plan

Create a validation plan with 3-6 scenarios, prioritizing the highest-risk or least-certain flows.

Include:

- scenario intent
- preconditions
- steps
- expected result
- evidence to collect
- owner

Example scenarios:

- user without required role denied a privileged route
- stale LDAP group no longer grants access
- service token cannot call admin-only API
- cross-tenant object access is denied
- support impersonation is logged and approval-gated

### 14. Assign an access control architecture score

Assign an overall score from 0-100 reflecting the maturity and risk posture of the application identity and authorization design.

This is not a vulnerability score. It reflects how understandable, enforceable, consistent, least-privilege, and bypass-resistant the authorization architecture appears to be.

Scoring dimensions:

1. Identity clarity and source-of-truth integrity: 0-20
2. Authorization model quality: 0-20
3. Enforcement consistency: 0-20
4. Bypass and escalation resistance: 0-15
5. Observability and governance: 0-15
6. Complexity and maintainability: 0-10

Score interpretation bands:

- 0-19: Very weak
- 20-39: Weak
- 40-59: Mixed
- 60-79: Strong
- 80-100: Mature

Also report:

- `Confidence`: High, Medium, or Low
- `Score volatility`: `+X / -Y`
- top 3 score drivers
- what would raise the score
- what would lower the score

## Mermaid helper scripts

The skill includes these local scripts under `plugins/copilot-security/skills/access-control-review/scripts/`:

- `mermaid-docs.mjs`: prints concise syntax guidance and common pitfalls for supported diagram types
- `validate-mermaid.mjs`: validates Mermaid blocks in Markdown reports or standalone Mermaid files using deterministic preflight checks

Supported diagram types:

- `flowchart`
- `sequenceDiagram`
- `classDiagram`
- `erDiagram`

Validation expectations:

- the first meaningful line must declare a supported Mermaid diagram type
- flowcharts must not mix sequence-diagram grammar
- sequence diagrams must not mix flowchart grammar and must close structured blocks with `end`
- Markdown reports may contain multiple Mermaid blocks and each block is validated independently

Example helper usage:

```bash
node plugins/copilot-security/skills/access-control-review/scripts/mermaid-docs.mjs --list
node plugins/copilot-security/skills/access-control-review/scripts/mermaid-docs.mjs --type flowchart
node plugins/copilot-security/skills/access-control-review/scripts/mermaid-docs.mjs --type sequenceDiagram
node plugins/copilot-security/skills/access-control-review/scripts/validate-mermaid.mjs --file "Access Control Architecture Review - 2026-04-18.md"
```

## Output format

Produce PR-comment-ready Markdown in chat.

If the environment supports writing files, also write:

`./Access Control Architecture Review - YYYY-MM-DD.md`

The report MUST include these sections:

1. Executive summary
2. Architecture score
3. Scope
4. Intake summary
5. Assumptions and unknowns
6. Architecture overview with validated diagrams
7. Identity and authorization inventory
8. Enforcement points
9. Endpoint and action mapping
10. Findings
11. Control maturity
12. Validation plan
13. Owners
14. Open questions

Required section details:

### Executive summary

- 5-10 bullets
- what was found
- what appears strong
- what appears risky
- major unknowns
- next actions

### Architecture score

- **Overall access control architecture score:** `NN/100`
- **Confidence:** High, Medium, or Low
- **Score volatility:** `+X / -Y`
- **Primary score drivers:** ...
- **What would raise the score:** ...
- **What would lower the score:** ...

### Scope

- in-scope components
- out-of-scope components
- principal types analyzed
- trust boundaries relevant to identity and access
- key protected assets and actions

### Intake summary

- identity source classification
- principal types
- authorization model
- source of truth for assignments
- main enforcement locations
- environment or tenant variance
- confidence in this section

### Assumptions and unknowns

- **ASSUMPTION:** ...
- **UNKNOWN:** ... including who can confirm and the question
- **Score-moving unknown:** ... including likely score effect

### Architecture overview with validated diagrams

Include:

- Identity and Access Control Overview
- Authorization Enforcement Architecture
- Endpoint or Action Protection View
- High-risk interaction sequences

Each diagram section should include an evidence list.

### Identity and authorization inventory

Include these tables:

- `Component | Mechanism | Evidence | Notes`
- `Type | Name | Defined In | Consumed In | Source of Truth | Notes`

### Enforcement points

Include this table:

- `Surface | Enforcement Type | Location | Required Access | Confidence | Notes`

### Endpoint and action mapping

Include this table:

- `Entry Point / Action | Principal Type | Required Role/Group/Permission/Policy | Enforcement Location | Evidence | Status | Notes`

Status values:

- `Explicit`
- `Inherited`
- `Indirect`
- `Missing`
- `Unknown`

### Findings

Include this table:

- `ID | Category | Summary | Severity (L/M/H) | Evidence | Why it matters | Recommendation`

Suggested categories:

- Missing authorization
- Inconsistent enforcement
- Weak role design
- Group-role mapping drift
- Privilege escalation
- Tenant isolation gap
- Admin or support risk
- Hidden alternate path
- Observability gap
- Maintainability risk

### Control maturity

Include this table:

- `Control | Status (PRESENT/ABSENT/UNKNOWN) | Evidence | Notes/Open questions`

### Validation plan

For each scenario include:

- intent
- preconditions
- steps
- expected result
- evidence to collect
- owner

### Owners

- who confirms assumptions
- who validates identity source mappings
- who owns policy definitions
- who owns route or service enforcement
- who drives remediation

### Open questions

- bullets with owner and where to look in the repository

### Quality checks

- groups, roles, permissions, claims, scopes, and policies are distinguished rather than conflated
- LDAP and directory mappings are explicitly marked as confirmed or assumed
- endpoint and action mappings tie to concrete enforcement points
- UI-only controls are not treated as sufficient authorization
- alternate execution paths were reviewed
- evidence vs inference is clearly separated
- all Mermaid diagrams were validated using the local Mermaid validator script

## Examples

### Example workflow

```bash
node plugins/copilot-security/skills/access-control-review/scripts/mermaid-docs.mjs --type flowchart
node plugins/copilot-security/skills/access-control-review/scripts/mermaid-docs.mjs --type sequenceDiagram
node plugins/copilot-security/skills/access-control-review/scripts/validate-mermaid.mjs --file "Access Control Architecture Review - 2026-04-18.md"
```

Expected outcome:

- the docs command prints supported syntax and common pitfalls for the selected diagram type
- the validator reports each Mermaid block as `PASS` or returns block-specific failures that must be fixed before final output

### Example output goals

- the report is grounded in repository evidence, not generic IAM advice
- roles, permissions, claims, scopes, and policies are mapped to concrete enforcement points
- diagrams highlight identity sources, enforcement paths, and high-risk flows without mixing Mermaid grammars
