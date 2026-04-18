---
agent: "application-security-architect"
name: access-control-review
description: "Analyze repository-grounded identity, access control, and authorization design. Map roles, groups, permissions, enforcement points, and endpoint protection using validated Mermaid diagrams."
---

# Prompt: Access Control & Authorization Architecture Review

## (Repo-Grounded IAM / AuthZ Mapping + Tool-Validated Mermaid)

## Mission & Scope

**Goal:** Analyze the current repository (and PR diff, if available) to identify how **identity, access control, and authorization** are implemented, configured, enforced, and consumed throughout the application.

Produce durable artifacts:

1. a repo-grounded Markdown report describing the application’s **authorization architecture**
2. validated Mermaid diagrams showing the identity and access control model
3. an endpoint-to-access-control mapping
4. a concise PR-ready summary (copy/paste)

This review should help developers answer questions such as:

- How do users and services authenticate?
- Which groups, roles, permissions, claims, or policies exist?
- Where are they defined?
- Where and how is access enforced?
- Which endpoints, actions, background jobs, and admin flows require which access controls?
- Are controls centralized, duplicated, inconsistent, or bypassable?
- Where are access decisions delegated to infrastructure, framework policy, middleware, or application code?
- Are LDAP / AD groups, SSO groups, JWT claims, app roles, scopes, permissions, or policy names mapped consistently?

---

## ✅ Context / Assumptions

- Review the current repository and/or current PR diff if available.
- Persist output as a Markdown file in project root:
  - `Access Control Architecture Review - {{DATE}}.md`
- Evidence first:
  - cite file paths and, when possible, line ranges
  - tie claims to source code, config, IaC, manifests, docs, tests, route declarations, and policy definitions
- If something cannot be confirmed from repo evidence, label it:
  - **ASSUMPTION**
  - **UNKNOWN**
- Ask **2–5 focused questions** only if they materially change interpretation of:
  - authentication source
  - identity provider
  - group/role source of truth
  - runtime enforcement location
  - environment-specific policy behavior
- Do not generate code changes unless explicitly requested.

---

## 🛂 Mandatory pre-report intake

Before producing the final report, perform a short intake to reduce ambiguity around identity source, authorization model, and enforcement location.

Ask **4–8 concise questions**, chosen based on repository evidence.

Prioritize the questions most likely to change the interpretation of access control design.

### Stage 1 — Identify identity source and authentication model

Ask 1–3 concise questions to classify how principals are established.

Prioritize these:

1. Which identity sources are used?
   - local accounts
   - corporate directory / LDAP / Active Directory
   - SSO / OIDC / SAML
   - external customer identity
   - service accounts / workload identity
   - API keys
   - mTLS / machine identity
   - mixed

2. Which principal types should be analyzed?
   - end users
   - administrators
   - support users
   - service-to-service callers
   - batch jobs / schedulers
   - CI/CD or automation identities

3. Are group memberships, roles, or claims resolved:
   - in the identity provider
   - at login/token issuance
   - via directory lookup at runtime
   - from an internal database
   - from configuration / static mapping
   - from policy code

### Stage 2 — Classify authorization model

Ask 1–2 questions that determine how access decisions are meant to work.

Prioritize these:

1. Which authorization styles are intended?
   - RBAC
   - ABAC
   - policy-based authorization
   - claims-based authorization
   - ACL/resource ownership
   - scope-based API authorization
   - custom/business-rule authorization
   - mixed

2. Which access concepts exist in the intended design?
   - LDAP / AD groups
   - SSO groups
   - app roles
   - claims
   - scopes
   - permissions
   - policy names
   - entitlements
   - tenant/organization membership
   - feature flags used as access gates

### Stage 3 — Locate enforcement and bypass risk

Ask 1–2 questions to understand where checks are actually enforced.

Prioritize these:

1. Where should authorization be enforced?
   - edge / gateway
   - middleware
   - route/controller annotations
   - service layer
   - domain/business logic
   - database row filters / stored procedures
   - background job workers
   - UI only
   - mixed

2. Are there known exceptions, bypass paths, or alternate execution paths such as:
   - internal APIs
   - admin tools
   - support impersonation
   - webhooks
   - background jobs
   - message consumers
   - GraphQL resolvers
   - file import/export flows
   - direct data access paths

### Stage 4 — Confirm source of truth and environment variance

1. What is the expected source of truth for access assignments?
   - directory groups
   - IdP groups/claims
   - application database
   - deployment config
   - IaC/platform policy
   - hard-coded mapping
   - mixed

2. Do role/group/permission mappings differ by environment or tenant?

### Intake rules

- Ask only the questions most likely to change the final architecture mapping.
- Use repository evidence first.
- If unanswered, continue with explicit **ASSUMPTION** and **UNKNOWN** markers.
- Distinguish clearly between:
  - identity source
  - access metadata
  - enforcement point
  - source of truth
  - runtime decision path

---

## 🧰 Mermaid Diagram Tooling (Mandatory)

You have access to Mermaid Chart tools:

- `mermaidchart.vscode-mermaid-chart/get_syntax_docs`
- `mermaidchart.vscode-mermaid-chart/mermaid-diagram-validator`
- `mermaidchart.vscode-mermaid-chart/mermaid-diagram-preview`

**You MUST use them** to prevent syntax errors.

### Tool-driven diagram workflow (required)

For every Mermaid diagram you include:

1. **Pick the correct diagram type**
   - consult `get_syntax_docs` before drafting the diagram type
2. **Draft minimal syntax**
   - prefer simple, reliable Mermaid constructs
3. **Validate**
   - run `mermaid-diagram-validator`
   - fix and re-validate until it passes
4. **Preview sanity check**
   - recommended for final architecture diagrams

### Mermaid reliability rules

- Always start with a valid diagram header
- Do not mix diagram grammars
- Keep node IDs simple and alphanumeric/underscore
- Put complex text in labels, not IDs
- Quote edge labels if they contain special characters
- Use unique node IDs
- Prefer `flowchart` and `sequenceDiagram` unless another type is clearly supported

**Gating requirement:**
> Do not output any Mermaid diagram unless it has passed the Mermaid validator.

---

## 🔍 Procedure

### 0) Triage & Inventory (fast, evidence-based)

Identify likely evidence sources such as:

- route declarations
- controllers / handlers / resolvers
- middleware / filters / guards / interceptors
- authorization decorators / annotations / attributes
- policy providers / handlers
- auth configuration
- LDAP / AD / OIDC / SAML / JWT config
- role / permission enums and constants
- database tables related to users, roles, groups, permissions, memberships, grants
- IaC or deployment config affecting authn/authz
- tests asserting authorization behavior
- admin/support tooling
- import/export and batch paths
- background job consumers and message handlers

Produce a short inventory list with evidence links.

### 1) Identify identity model

Determine, with evidence where possible:

- authentication mechanisms in use
- identity providers / directory integrations
- principal types
- token/session contents relevant to authorization
- group / role / permission resolution path
- whether LDAP / AD groups are used directly or mapped into application roles/claims
- whether identity and authorization metadata are static, configuration-driven, or data-driven

### 2) Identify authorization model

Determine:

- which authorization paradigms are present:
  - RBAC
  - ABAC
  - PBAC
  - claims/scopes
  - resource ownership checks
  - tenant boundary checks
  - feature-flag-based gating
- the named roles, groups, permissions, scopes, claims, or policies discovered
- where they are defined
- whether there is a single source of truth or fragmented sources
- whether roles/groups are broad business labels or precise permission bundles
- whether access is coarse-grained, fine-grained, or inconsistent

### 3) Map enforcement points

For each major entry point and action path, identify where access is checked:

- edge/gateway
- middleware
- route/controller decorator/attribute/annotation
- service layer
- domain logic
- repository/data-access layer
- UI-only checks
- job worker / consumer / scheduler path

For each enforcement point, determine whether it appears:

- centralized
- duplicated
- missing
- inconsistent
- bypassable
- dependent on client behavior
- dependent on naming convention rather than durable policy logic

### 4) Build endpoint and action mapping

Create a mapping for:

- HTTP endpoints
- GraphQL operations
- RPC methods
- message consumers
- background jobs
- admin/support actions
- export/import flows

For each, capture where possible:

- route/action name
- principal type
- required role/group/permission/policy/claim/scope
- enforcement location
- evidence
- confidence
- whether protection is explicit, inherited, indirect, or missing

### 5) Detect architecture weaknesses and authorization drift

Look specifically for:

- missing authorization on sensitive endpoints
- UI-only authorization
- inconsistent policy names
- role explosion or ambiguous role semantics
- hard-coded role strings scattered through code
- stale or unused permissions
- broad wildcard/admin grants
- support/admin impersonation risk
- privilege escalation paths
- missing tenant/resource ownership checks
- confused deputy behavior
- direct object reference exposure
- inconsistent group-to-role mapping
- environment-specific drift
- hidden alternate paths through jobs, webhooks, or internal APIs

### 6) Produce diagrams (validated)

You MUST include Mermaid diagrams unless Mermaid rendering is unsupported.

#### Required diagram set

1. **Identity & Access Control Overview**
   - identity sources
   - token/session/claims path
   - group/role/permission mapping
   - major enforcement points
   - trust boundaries where relevant

2. **Authorization Enforcement Architecture**
   - major subsystems
   - entry points
   - middleware/filters/guards
   - policy engines/providers
   - service/domain enforcement
   - datastore lookups
   - external group/directory dependencies

3. **Endpoint-to-Policy / Role Mapping View**
   - use a Mermaid diagram that makes major protected surfaces visible
   - group similar endpoints when necessary for readability

4. **Top 2–3 Sequence Diagrams**
   - highest-risk or most important auth flows, such as:
     - login and claims resolution
     - privileged admin action
     - export/reporting action
     - service-to-service authorization
     - support impersonation flow

#### Optional diagrams

- LDAP / AD group mapping view
- tenant / organization access model
- data classification vs authorization boundary map
- deployment/runtime auth boundary view

### 7) Evaluate control maturity

For key access-control concerns, identify whether controls are:

- **PRESENT**
- **ABSENT**
- **UNKNOWN**

Examples:

- centralized policy enforcement
- least-privilege role design
- separation of duties
- admin action protection
- support impersonation controls
- service identity scoping
- tenant isolation checks
- export/download restrictions
- audit logging for authorization decisions or privileged actions
- deny-by-default behavior
- test coverage for authorization rules

When marked PRESENT, provide evidence.

### 8) Validation plan

Create a validation plan with **3–6 scenarios**, prioritizing the highest-risk or least-certain flows.

Include:

- scenario intent
- preconditions
- steps
- expected result
- evidence to collect
- owner

Examples:

- user without required role denied a privileged route
- stale LDAP group no longer grants access
- service token cannot call admin-only API
- cross-tenant object access is denied
- support impersonation is logged and approval-gated

---

## 📏 Access control architecture score (0–100)

You MUST assign an overall score from **0–100** reflecting the maturity and risk posture of the application’s identity and authorization design.

Purpose:

- This is not a vulnerability score.
- It reflects how understandable, enforceable, consistent, least-privilege, and bypass-resistant the authorization architecture appears to be.

### Scoring dimensions

1. **Identity clarity and source-of-truth integrity (0–20)**
   - Are identity sources and access assignments clear, consistent, and evidence-backed?

2. **Authorization model quality (0–20)**
   - Are roles/groups/permissions/policies well-structured, least-privilege, and semantically meaningful?

3. **Enforcement consistency (0–20)**
   - Are checks applied consistently across routes, services, jobs, and admin paths?

4. **Bypass and escalation resistance (0–15)**
   - Are there alternate paths, UI-only checks, hidden admin routes, or impersonation risks?

5. **Observability and governance (0–15)**
   - Are privileged actions, access changes, and authorization decisions testable, reviewable, and auditable?

6. **Complexity and maintainability (0–10)**
   - Is the model understandable and scalable, or fragmented and brittle?

### Score interpretation bands

- 0–19: Very weak
- 20–39: Weak
- 40–59: Mixed
- 60–79: Strong
- 80–100: Mature

Also report:

- **Confidence:** High / Medium / Low
- **Score volatility:** `+X / -Y`
- **Top 3 score drivers**
- **What would raise the score**
- **What would lower the score**

---

## 📦 Output Format (GitHub-Flavored Markdown)

Return the review as PR-comment-ready Markdown in chat.

If the environment supports writing files, also write:

`./Access Control Architecture Review - {{DATE}}.md`

### 0. Executive summary

- 5–10 bullets
- what was found
- what appears strong
- what appears risky
- major unknowns
- next actions

### 0.1 Architecture score

- **Overall access control architecture score:** `NN/100`
- **Confidence:** High / Medium / Low
- **Score volatility:** `+X / -Y`
- **Primary score drivers:** ...
- **What would raise the score:** ...
- **What would lower the score:** ...

### 1. Scope

- In-scope components:
- Out-of-scope:
- Principal types analyzed:
- Trust boundaries relevant to identity/access:
- Key protected assets/actions:

### 1.1 Intake summary

- Identity source classification:
- Principal types:
- Authorization model:
- Source of truth for assignments:
- Main enforcement locations:
- Environment/tenant variance:
- Confidence in this section:

### 2. Assumptions & Unknowns

- **ASSUMPTION:** ...
- **UNKNOWN:** ... (include “Who can confirm” + question)
- **Score-moving unknown:** ... (include likely score effect)

### 3. Architecture Overview (with tool-validated diagrams)

#### 3.1 Identity & Access Control Overview

```mermaid
flowchart LR
  %% validated diagram
```

**Evidence**

- `path/to/file` (symbol: ..., lines ...)

#### 3.2 Authorization Enforcement Architecture

```mermaid
flowchart LR
  %% validated diagram
```

**Evidence**

- ...

#### 3.3 Endpoint / Action Protection View

```mermaid
flowchart LR
  %% validated diagram
```

**Evidence**

- ...

#### 3.4 High-risk interaction sequences

```mermaid
sequenceDiagram
  %% validated diagram
```

**Evidence**

- ...

### 4. Identity and authorization inventory

#### 4.1 Identity sources and auth mechanisms

Table:

`Component | Mechanism | Evidence | Notes`

#### 4.2 Groups, roles, permissions, claims, scopes, policies

Table:

`Type | Name | Defined In | Consumed In | Source of Truth | Notes`

### 5. Enforcement points

Table:

`Surface | Enforcement Type | Location | Required Access | Confidence | Notes`

### 6. Endpoint and action mapping

Table:

`Entry Point / Action | Principal Type | Required Role/Group/Permission/Policy | Enforcement Location | Evidence | Status | Notes`

Status values:

- Explicit
- Inherited
- Indirect
- Missing
- Unknown

### 7. Findings

Table:

`ID | Category | Summary | Severity (L/M/H) | Evidence | Why it matters | Recommendation`

Suggested categories:

- Missing authorization
- Inconsistent enforcement
- Weak role design
- Group-role mapping drift
- Privilege escalation
- Tenant isolation gap
- Admin/support risk
- Hidden alternate path
- Observability gap
- Maintainability risk

### 8. Control maturity

Table:

`Control | Status (PRESENT/ABSENT/UNKNOWN) | Evidence | Notes/Open questions`

### 9. Validation plan

For each scenario:

- Intent
- Preconditions
- Steps
- Expected result
- Evidence to collect
- Owner

### 10. Owners

- Who confirms assumptions:
- Who validates identity source mappings:
- Who owns policy definitions:
- Who owns route/service enforcement:
- Who drives remediation:

### 11. Open questions

- bullets with owner and where to look in repo

### ✅ Quality checks

- Groups, roles, permissions, claims, scopes, and policies are distinguished rather than conflated
- LDAP / directory mappings are explicitly marked as confirmed or assumed
- Endpoint/action mappings tie to concrete enforcement points
- UI-only controls are not treated as sufficient authorization
- Alternate execution paths were reviewed
- Evidence vs inference is clearly separated
- All Mermaid diagrams were validated using `mermaid-diagram-validator`
