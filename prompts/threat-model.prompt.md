---
agent: "application-security-architect"
name: threat-model
description: "Threat model the system using the 4Q framework and produce actionable artifacts."
---

# Prompt: 4Q Threat Model

## Mission & Scope

**Goal:** Embed Adam Shostack’s **Four-Question** threat modeling into daily dev flow using VS Code + GitHub. The agent infers design from code, collaborates with the developer, and produces durable artifacts (e.g., a threat model markdown report), plus a concise PR-ready summary.

**4 Questions:**
1. *What are we working on?* → Infer & confirm scope, dataflows, trust boundaries.  
2. *What can go wrong?* → Brainstorm threats (context-specific, STRIDE/OWASP mapped).  
3. *What are we going to do about it?* → Check current mitigations, propose mitigation status.  
4. *Did we do a good job?* → Define validation evidence to collect and owners.

**Where it runs:**
- **Local:** VS Code Copilot Chat / Agent mode for developers.
- **PR review:** Use the same output format as a PR comment or issue description.

## ✅ Context / Assumptions
- Threat model the current repository and/or current PR diff (if available).
- Persist the resulting threat model as a Markdown file in the project root named: `Threat Model Review - {{DATE}}.md`.
- Evidence-first: cite file paths and (when possible) line ranges for claims about mitigations.
- If you cannot confirm something from the repo/diff, label it as **ASSUMPTION** or **UNKNOWN** (do not guess).
- Ask 2–4 clarifying questions if scope/dataflows/deployment assumptions are unclear.
- Do not generate code changes unless explicitly requested; focus on analysis and artifacts.

## 🔍 Procedure (4Q)
1) **Q1 — What are we working on?**
   - Summarize scope, assets, key dataflows, and trust boundaries.
2) **Q2 — What can go wrong?**
   - Enumerate threats specific to the flows; map each to STRIDE + OWASP tag.
3) **Q3 — What are we going to do about it?**
   - Identify mitigations as **PRESENT / ABSENT / UNKNOWN**, with evidence when present.
4) **Q4 — Did we do a good job?**
   - Define a validation plan (no code): scenarios + evidence to collect + owners.

## 📦 Output Format
1) Write the full threat model report to `./Threat Model Review - {{DATE}}.md` (project root).
2) Return the same content as GitHub-flavored Markdown in chat (PR-comment ready) with:

### Scope
- Components:
- Trust boundaries:
- Key dataflows:

### Assumptions
- (bullets; include owner/questions where possible)

### Threats
Table: `ID | Summary | STRIDE | OWASP | Likelihood (L/M/H) | Impact (L/M/H) | Status | Rationale`

### Mitigations
Table: `Threat ID | Mitigation | Status (PRESENT/ABSENT/UNKNOWN) | Location/Evidence | Notes/Open questions`

### Validation plan (no code)
Provide **3 scenarios**:
- Intent
- Preconditions
- Steps
- Expected result
- Evidence to collect

### Owners
- Who confirms assumptions
- Who drives mitigations

### Open questions
- Items needing confirmation

## ✅ Quality checks
- Every **PRESENT** mitigation includes a concrete code/config location when possible (path + line range).
- **UNKNOWN** is used when evidence is insufficient and includes a follow-up question.
- Threats are specific to described flows (avoid generic lists).
- Evidence vs assumptions are clearly separated and labeled.
