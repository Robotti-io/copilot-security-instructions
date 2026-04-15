---
agent: "application-security-architect"
name: threat-model
description: "Threat model the system using Shostack’s 4Q framework and produce actionable artifacts with repo-grounded diagrams validated via Mermaid Chart tools."
---

# Prompt: 4Q Threat Model (DFDs + Supporting Diagrams, Tool-Validated Mermaid)

## Mission & Scope

**Goal:** Embed Adam Shostack’s **Four-Question** threat modeling into daily dev flow using VS Code + GitHub. Infer design from the repository (and/or PR diff), collaborate with the developer, and produce durable artifacts:

1. a repo-grounded threat model Markdown report **with validated Mermaid diagrams**
2. a concise PR-ready summary (copy/paste)

**4 Questions:**

1. *What are we working on?* → Infer & confirm scope, assets, data flows, trust boundaries
2. *What can go wrong?* → Enumerate threats (context-specific), map to STRIDE + OWASP
3. *What are we going to do about it?* → Identify mitigations + gaps; status w/ evidence
4. *Did we do a good job?* → Validation plan: evidence to collect + owners

**Where it runs:**

- **Local:** VS Code Copilot Chat / Agent mode
- **PR review:** Same output format works as PR comment or issue description

---

## ✅ Context / Assumptions

- Threat model the current repository and/or current PR diff (if available).
- Persist output as a Markdown file in project root:
  - `Threat Model Review - {{DATE}}.md`
- Evidence-first: cite file paths and (when possible) line ranges for claims about design, flows, mitigations, and trust boundaries.
- If you cannot confirm something from the repo/diff, label it **ASSUMPTION** or **UNKNOWN** (do not guess).
- Ask **2–4 clarifying questions** if scope, dataflows, deployment, or identities are unclear.
- Before generating the final report, perform a short mandatory **attack-surface and risk calibration intake** focused on **reachability, privileged actions, data sensitivity, runtime isolation, and score-driving controls**.
- Do not generate code changes unless explicitly requested.

---

## 🧭 Evidence hierarchy and grounding rules

Use this hierarchy for factual claims and prioritization:

1. **Repo-confirmed** — code, config, IaC, docs, tests, manifests, or other repository evidence
2. **Runtime/deployment evidence** — screenshots, configs, logs, or operator-supplied deployment artifacts
3. **Operator-stated** — user answers not independently confirmed from evidence
4. **ASSUMPTION**
5. **UNKNOWN**

Rules:

- Prefer **Repo-confirmed** evidence over operator answers whenever both address the same claim.
- If operator answers conflict with repo evidence, prefer the repo evidence and explicitly call out the contradiction.
- If operator answers fill a gap the repo cannot answer, label those statements as **Operator-stated** rather than confirmed.
- Before using an operator answer to drive scoring or prioritization, attempt to **confirm, narrow, weaken, or contradict** it using repo evidence.
- Do not let operator answers quietly become “facts” in the report.
- The final report must include at least **3 code-anchored or IaC-anchored findings** that do not depend primarily on operator answers.
- Do not let unconfirmed edge/network unknowns overshadow a higher-confidence application or IaC weakness already evidenced in the repo.

### Grounding examples

- If the operator says **internal only**, check for public App Service, public ingress, open health endpoints, public webhooks, or externally reachable callback paths.
- If the operator says **no sensitive data**, inspect schemas, models, logging fields, secrets loading, import/export endpoints, and subscriber/user data stores.
- If the operator says **admins only**, inspect RBAC middleware, role enums, route guards, admin paths, and UI affordances.
- If the operator says **WAF present**, but there is no repo evidence, record it as **Operator-stated** and reduce confidence rather than treating it as fully confirmed.

---

## 🛂 Mandatory pre-report attack-surface and risk calibration intake

Before generating the final threat model, ask **4–8 concise questions** chosen to reduce ambiguity around:

- reachable attack surface
- privileged pathways
- data sensitivity
- environment separation
- score-relevant controls

Do **not** ask a flat generic questionnaire.  
Instead, use a **branching intake**:

### Stage 1 — Classify exposure and reachability first

Ask 1–3 concise questions to place the application into an exposure bucket.

Prefer plain language where possible so developers can answer accurately.

Prioritize these:

1. Which best describes the application’s reachability?
   - isolated/internal segmented
   - corp network only
   - VPN/ZTNA only
   - partner/vendor reachable
   - public internet, non-prod only
   - public internet, production
   - mixed exposure

2. Are any of these reachable differently from the main app:
   - admin panel
   - support tools
   - debug endpoints
   - APIs
   - webhooks/callbacks
   - file upload/import endpoints
   - machine-to-machine interfaces

3. If the application is **not** internet-exposed, what restricts access:
   - network segmentation
   - VPN
   - ZTNA
   - managed devices
   - corporate SSO
   - MFA for admins
   - bastion/jump host
   - internal reverse proxy/API gateway/ingress

Use clearer variants when helpful, such as:

- “Can someone on the public internet open the app without VPN or corp network access?”
- “Is there a public hostname, or only an internal/private hostname?”
- “Does traffic go straight to the app, or through something like Front Door, Cloudflare, an API gateway, or an ingress controller?”

### Stage 2 — Classify privilege and blast radius

Ask 1–2 questions that determine what an attacker could do if they gained access.

Prioritize these:

1. Is the system primarily:
   - read-only
   - transactional
   - administrative
   - approval-oriented
   - control-plane / identity / security critical

2. Which roles can:
   - administer
   - impersonate
   - bulk export
   - approve/deny
   - change configuration
   - manage identities/permissions
   - trigger downstream actions

3. Could compromise affect:
   - tenant-wide data
   - downstream systems
   - money movement
   - identity/access
   - security controls
   - customer or employee records at scale

### Stage 3 — Classify data sensitivity precisely

Ask 1–2 questions that distinguish **data type** from **actual sensitivity**.

Prioritize these:

1. What data categories are present? Distinguish between:
   - public/reference data
   - internal business data
   - directory/basic identity data (name, work email, title, department)
   - standard personal data
   - regulated/high-impact PII
   - secrets/credentials
   - financial/business records
   - customer content

2. Which of those are actually sensitive, regulated, confidential, or reportable if exposed, altered, or exported?

3. Do **not** treat all “PII” equally. Distinguish:
   - **Directory/basic identity data:** first/last name, work email, job title, department
   - **Standard personal data:** personal email, phone, mailing address, employee ID
   - **High-impact or regulated PII:** SSN/national ID, passport, driver’s license, payroll/tax data, financial account data, health data, recovery data, credentials, secrets

### Stage 4 — Ask only the control questions that match the exposure type

Ask **public-edge control questions only if any surface is externally reachable**.

If any surface is externally reachable, prioritize:

1. Is traffic protected by a WAF, CDN, reverse proxy, API gateway, rate limiting, bot protection, or DDoS service? Name the product/service if known.

If the application is internal-only, do **not** ask about WAF by default. Instead prioritize:

1. What controls restrict internal access:

- segmentation
- VPN/ZTNA
- SSO
- MFA for admins
- managed devices
- internal ingress/proxy/gateway
- east-west restrictions

### Stage 5 — Confirm environment isolation and uncertainty

1. Which runtime environments exist and are they isolated by:

- network
- identity
- secrets
- data
- service accounts

1. Which answers are confirmed from architecture/deployment evidence versus operator assumption?

### Intake rules

- Ask these questions before producing the final report, even if some answers may be partially inferred from the repo.
- Ask **only the questions most likely to change the risk score materially**.
- Avoid irrelevant questions once exposure type is known.
- If the developer does not answer, continue with explicit **ASSUMPTION** and **UNKNOWN** markers.
- Use repo evidence first, then use the operator’s answers to refine reachability, trust boundaries, residual risk, and prioritization.
- Where possible, explicitly identify:
  - **reachability**
  - **privileged pathways**
  - **data sensitivity**
  - **blast radius**
  - **control maturity**
  - **unknowns that could move the score**

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
   - Before drafting each diagram, consult `get_syntax_docs` for that diagram type (e.g., `flowchart`, `sequenceDiagram`, `C4`, `classDiagram`, `erDiagram`).
2. **Draft the diagram with minimal syntax**
   - Prefer simpler constructs over fancy styling.
   - Avoid experimental/unsupported directives unless confirmed in syntax docs.
3. **Validate**
   - Run `mermaid-diagram-validator` on each diagram block.
   - If validation fails, fix and re-validate until it passes.
4. **Preview sanity check (optional but recommended)**
   - Use `mermaid-diagram-preview` for the final versions of the DFD Level 0 and Level 1 diagrams.

### Mermaid reliability rules (to avoid common breakage)

- Always start with a valid diagram header: `flowchart LR`, `sequenceDiagram`, `classDiagram`, `erDiagram`, etc.
- Don’t mix diagram grammars (e.g., don’t use `participant` in `flowchart`).
- Avoid parentheses/brackets in node IDs; put complex text in node *labels*.
  - Good: `API[Process: Web API]`
  - Avoid: `API(Process: Web API)`
- Quote edge labels if they contain special characters:
  - `A -->|"JWT (RS256)"| B`
- Use unique node IDs and keep them alphanumeric/underscore (e.g., `svc_orders`, `db_main`).
- Keep subgraph titles simple; avoid `:` if it breaks parsing.
- Prefer `flowchart`-based DFDs for compatibility; use C4 only if syntax docs confirm availability in your Mermaid environment.

**Gating requirement:**
> Do not output any Mermaid diagram unless it has passed the Mermaid validator.

---

## 🔒 Diagram Requirements (Mermaid)

**You MUST include diagrams** unless Mermaid rendering is not supported. Use Mermaid code blocks.

### Required diagram set

1. **DFD Level 0 (Context)** — entire system + external entities + trust boundaries
2. **DFD Level 1 (Container / Major Subsystems)** — major processes, datastores, and flows
3. **Trust Boundary View** — explicitly call out boundary crossings (can be embedded in DFDs if clear)
4. **Top 2–3 Sequence Diagrams** — highest-risk flows (auth/login, payment, admin action, data export)

### Optional (include when discoverable)

- **Deployment / Runtime Topology** (k8s/compose/serverless/IaC-derived)
- **Identity & Authorization model diagram** (actors → roles → permissions → enforcement points)
- **Data classification map** (PII/PHI/secrets/payment data) tied to datastores and flows

### Diagram evidence rules

- Every diagram must include a short **Evidence** list:
  - file path(s) + relevant symbol(s) (and line ranges when possible)
- If you cannot infer an element, label it **UNKNOWN** in the diagram and explain what evidence is missing.

---

## 🔍 Procedure (4Q)

### 0) Triage & Inventory (fast, evidence-based)

### 0a) Exposure and risk calibration

Before drafting the report:

- run the mandatory branching attack-surface and risk calibration intake
- summarize the answers as:
  - Reachability classification
  - Externally reachable surfaces
  - Internal access restrictions
  - Privileged pathways
  - Data sensitivity classification
  - Environment/runtime isolation
  - Score-relevant controls
  - Confidence in the intake
- separate the above into:
  - **Repo-confirmed**
  - **Operator-stated**
  - **UNKNOWN**
- use this calibration to adjust threat likelihood, impact, residual risk, and remediation prioritization

- Identify entry points, deployables, and primary data stores:
  - manifests (`package.json`, `pom.xml`, `.csproj`, `pyproject.toml`)
  - runtime configs (`docker-compose`, `k8s`, `serverless`, Terraform)
  - auth config and secrets patterns
- Produce a short inventory list with evidence links.

### 0b) Contradictions and reconciliation

Before finalizing the score or executive summary, explicitly check for contradictions between:

- operator answers
- repo evidence
- IaC/runtime evidence
- prior assumptions

If contradictions exist:

- call them out in a short **Contradictions and Reconciliation** subsection
- reduce confidence accordingly
- do not treat the contradicted claim as settled fact

### 1) **Q1 — What are we working on?**

Deliver:

- System purpose (from README/docs where possible)
- Components / containers / deployables
- Key assets (data + systems)
- **Key dataflows** (ranked by sensitivity, privilege, and exposure)
- Trust boundaries (internet/app/network/cloud/3rd party/admin/internal segmentation)
- **Diagrams (DFD L0 + L1 + trust boundaries)** — tool-validated

### 2) **Q2 — What can go wrong?**

For each key flow in the DFD:

- Enumerate threats specific to that flow
- Map to:
  - **STRIDE** category
  - **OWASP** tag (Top 10 / ASVS control area / API Top 10 — whichever best fits)
- Include a short “Attack narrative” for the top risks (2–5 sentences)

Also include:

- Abuse cases for privileged/admin pathways
- Supply chain threats if dependency/build pipeline evidence exists
- Reachability-specific threats:
  - public-edge abuse if externally reachable
  - internal abuse, lateral movement, over-broad access, or privilege misuse if internal-only
- Data misuse cases:
  - bulk export
  - enumeration
  - inference
  - downstream action abuse
  - support/admin impersonation
  - webhook/callback abuse where applicable

Threat selection rules:

- Preserve at least **2–3 high-confidence code-anchored or IaC-anchored threats** among the top findings.
- Do not let generic public-edge uncertainty displace a more concrete application or infrastructure weakness already evidenced in the repo.
- Prefer threats whose exploit path can be tied to an actual flow, boundary crossing, or control gap.

### 3) **Q3 — What are we going to do about it?**

For each threat:

- Identify mitigations as **PRESENT / ABSENT / UNKNOWN**
- Provide evidence when PRESENT:
  - exact file path + symbol + line range (when possible)
- If ABSENT/UNKNOWN:
  - propose remediation options
  - note expected effort (S/M/L) and blast-radius

### Threat-to-mitigation status logic (mandatory)

Use distinct concepts for **mitigation existence** and **threat closure**.

#### Mitigation status

Use these values in the mitigations table:

- **PRESENT**
- **ABSENT**
- **UNKNOWN**

#### Threat status

Use these values in the threats table:

- **Mitigated** — present controls materially address the **core exploit path** and residual risk is no longer a priority concern
- **Partially Mitigated** — relevant controls exist and reduce likelihood or impact, but meaningful residual risk remains
- **Open** — no material control addresses the core exploit path, or the key control is absent
- **Unknown** — evidence is insufficient to determine whether the threat is materially controlled

Rules:

- Do **not** count a control as a mitigation for a threat unless it directly reduces that threat’s exploitability, impact, or blast radius.
- Baseline controls such as TLS, JWT validation, or generic logging do **not** automatically mitigate every threat in the same flow.
- A threat may remain **Open** even if adjacent controls are present.
- Use **Partially Mitigated** when meaningful controls clearly reduce but do not close the risk.
- If the threat is phrased as **compromise of a valid privileged session**, controls like JWT validation or basic RBAC do not mitigate that threat; instead look for MFA, step-up auth, re-auth, device trust, approval gates, anomaly detection, session protections, or blast-radius reduction.

### 4) **Q4 — Did we do a good job?**

Create a validation plan (no code changes) that includes:

- 3–6 scenarios (prioritize highest-risk flows)
- Evidence to collect (logs, config proof, test results, screenshots, policy outputs)
- Owners (team/person/role)

Validation plan rules:

- Include at least **one scenario that tests a code-evidenced weakness**
- Include at least **one scenario that validates a major operator-stated assumption**
- Include at least **one scenario that exercises a privileged workflow misuse case**

Include a final quality review checklist:

- Coverage: do DFD flows map to threats/mitigations?
- Boundary crossings: are they analyzed?
- Unknowns: are they actionable questions with owners?
- Risk score: are the dominant score drivers explained?
- Mermaid diagrams: did all pass validator?

---

## 📏 Application risk score (0–100)

You MUST assign an overall application risk score from **0–100** and explain it.

Purpose:

- This is an overall **business-adjusted application risk score**, not a vulnerability severity score.
- The score should reflect **reachable attack surface, privileged action capability, data sensitivity, abuse amplification, defensive posture, and operational complexity**.

### Scoring model

Score the application using these **6 dimensions**:

1. **Reachability and exposure (0–20)**
   - 0–4: isolated or tightly segmented internal surface
   - 5–8: internal-only but broadly reachable by employees or corp network users
   - 9–12: partner/vendor reachable, mixed internal exposure, or limited external non-prod exposure
   - 13–16: public-facing production app/API with moderate external surface
   - 17–20: broad public exposure, externally reachable admin/control plane, or multiple exposed entry points

2. **Privilege, blast radius, and action power (0–20)**
   - 0–4: narrow blast radius, read-only, low privilege
   - 5–8: moderate business importance or limited write actions
   - 9–12: approval, export, downstream actions, or meaningful privileged workflows
   - 13–16: admin actions, support impersonation, tenant-wide operations, or significant downstream control
   - 17–20: identity/security critical, production control plane, broad destructive capability, or very high blast radius

3. **Data sensitivity and consequence (0–20)**
   - 0–4: public/reference data only
   - 5–8: internal business data or directory/basic identity data only
   - 9–12: standard personal data, confidential internal records, or meaningful customer/employee data
   - 13–16: high-impact personal data, confidential customer content, financial account relevance, or regulated records
   - 17–20: highly regulated or breach-notification-triggering data, secrets, credentials, high-impact identity data, payment or health data

4. **Abuse amplification and misuse potential (0–15)**
   - 0–3: simple app, limited misuse potential, no bulk access or downstream action
   - 4–7: some write actions, moderate integrations, or moderate inference/enumeration value
   - 8–11: bulk export, impersonation, downstream triggers, machine-to-machine interfaces, or privileged background actions
   - 12–15: strong pivot potential, mass action capability, lateral movement value, or highly abusable integrations

5. **Defensive posture and control maturity (0–15)**
   - 0–3: strong controls confirmed and matched to the actual exposure model
   - 4–8: partial controls or mixed evidence
   - 9–15: key controls absent, weakly matched to exposure, or materially unknown

6. **Operational complexity and trust boundaries (0–10)**
   - 0–2: simple architecture, few integrations, few trust boundaries
   - 3–6: moderate integration/admin/runtime complexity
   - 7–10: many integrations, inbound callbacks/webhooks, multiple trust boundaries, or complex support/admin/runtime surface

### Scoring rules

- Do **not** treat “internal-only” as automatically safe.
- Do **not** ask or score cloud/public-edge protections as though they are required for internal-only apps.
- Internal-only applications may still score moderate or high if they have:
  - privileged actions
  - broad employee reachability
  - sensitive data
  - weak segmentation
  - bulk export capability
  - downstream control
- Distinguish **data category** from **actual sensitivity**:
  - “financial data” that is public/reference should not be scored like regulated financial account data
  - employee names and work emails alone should not be scored like high-impact regulated PII
- Do not treat all “PII” equally:
  - **Directory/basic identity data** alone is lower sensitivity unless combined with privileged context, recovery functions, or broader abuse paths
- Unknowns should increase uncertainty, but should not automatically inflate the score without explanation.
- Explicitly identify the top **3 score drivers**.
- If a major score driver depends primarily on operator input, mark it as **operator-stated** in the rationale.

### Confidence and score volatility

Also report:

- **Confidence:** High / Medium / Low
- **Score volatility:** expected upward/downward movement if major unknowns are resolved, e.g. `+10 / -4`

Confidence depends on how much was confirmed from:

- repo evidence
- operator answers
- deployment/runtime evidence

If major exposure, privilege, or sensitivity answers are unknown, lower confidence and explicitly state what assumptions most affected the score.

### Score interpretation bands

- 0–19: Very low
- 20–39: Low
- 40–59: Moderate
- 60–79: High
- 80–100: Critical

---

## 📦 Output Format (GitHub-Flavored Markdown)

Return the threat model as PR-comment-ready Markdown in chat.

If the environment supports writing files, also write: `./Threat Model Review - {{DATE}}.md`

### 0. Executive summary

- 5–10 bullets: top risks, what’s solid, what’s unknown, next actions
- Overall application risk score and top 3 score drivers
- Include at least one bullet that highlights a **repo-confirmed** high-confidence finding

### 0.1 Risk score

- **Overall application risk score:** `NN/100` (**Very low / Low / Moderate / High / Critical**)
- **Confidence:** High / Medium / Low
- **Score volatility:** `+X / -Y`
- **Primary score drivers:** reachability, privilege/action power, data sensitivity, abuse amplification, control maturity, complexity
- **What would raise the score:** ...
- **What would lower the score:** ...

### 1. Scope

- In-scope components/containers:
- Out-of-scope:
- Trust boundaries:
- Key assets (with sensitivity: Public/Internal/Confidential/Restricted):

### 1.1 Exposure & risk calibration

- **Repo-confirmed:**
- **Operator-stated:**
- **UNKNOWN:**
- Reachability classification:
- Externally reachable surfaces:
- Internal access restrictions:
- Privileged pathways:
- Data sensitivity classification:
- Environment/runtime isolation:
- Score-relevant controls:
- Confidence in this section:

### 1.2 Contradictions and reconciliation

- Any meaningful contradictions between operator answers, repo evidence, or assumptions
- How they affected confidence or scoring

### 2. Assumptions & Unknowns

- **ASSUMPTION:** …
- **UNKNOWN:** … (include “Who can confirm” + question)
- **Score-moving unknown:** … (include how it could change the score)

### 3. Architecture & Data Flows (with tool-validated diagrams)

#### 3.1 DFD Level 0 (Context)

```mermaid
flowchart LR
  %% (diagram content validated via Mermaid Chart tools)
```

**Evidence**

- `path/to/file` (symbol: …, lines …)

#### 3.2 DFD Level 1 (Subsystems / Containers)

```mermaid
flowchart LR
  %% (diagram content validated via Mermaid Chart tools)
```

**Evidence**

- …

#### 3.3 Supporting diagrams (as applicable)

- Trust boundary view (if not already clear)
- Deployment topology (if discoverable)
- Identity/authorization model (if discoverable)
- Data classification map (if discoverable)

### 4. Key Flows (ranked)

For each flow:

- Description
- Data elements involved (classify precisely)
- Entry points and enforcement points
- Reachability / exposure context
- Privileged actions involved
- Evidence links

### 5. Threats

Table:

`ID | Flow | Summary | STRIDE | OWASP | Likelihood (L/M/H) | Impact (L/M/H) | Status (Open/Partially Mitigated/Mitigated/Unknown) | Rationale`

Add one short note below the table:

- explain why any threat marked **Partially Mitigated** is not fully closed

### 6. Mitigations

Table:

`Threat ID | Mitigation | Status (PRESENT/ABSENT/UNKNOWN) | Directness (Direct/Adjacent) | Location/Evidence | Notes/Open questions`

Rules:

- Mark **Directness = Direct** only if the control materially reduces that threat’s exploitability, impact, or blast radius
- Use **Adjacent** for controls that are good hygiene or relevant to the same flow, but do not directly mitigate the threat as written

### 7. High-risk interaction sequences (top 2–3, tool-validated)

Provide sequence diagrams for the riskiest flows:

```mermaid
sequenceDiagram
  %% (diagram content validated via Mermaid Chart tools)
```

**Evidence**

- …

### 8. Validation plan (no code)

Provide **3–6 scenarios**:

- Intent
- Preconditions
- Steps
- Expected result
- Evidence to collect
- Owner

### 9. Owners

- Who confirms assumptions:
- Who drives mitigations:
- Who validates fixes:

### 10. Open questions

- Bullets; each includes an owner and where to look in the repo

### ✅ Quality checks

- Every **PRESENT** mitigation includes concrete code/config location (path + lines when possible).
- Every threat status is consistent with the listed mitigations and their **Directness**.
- **UNKNOWN** includes a follow-up question + owner.
- Threats are tied to DFD flows (no generic dump).
- Intake questions were relevant to the application’s exposure model.
- Data sensitivity was classified precisely rather than by broad labels alone.
- At least **3 findings** are anchored directly in code or IaC evidence.
- The risk score includes top drivers and score-moving unknowns.
- Diagrams match actual repo components and are evidence-linked.
- Evidence vs. inference is clearly labeled.
- **All Mermaid diagrams were validated using `mermaid-diagram-validator`.**
