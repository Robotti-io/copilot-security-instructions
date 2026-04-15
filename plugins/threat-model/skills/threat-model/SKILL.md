---
name: threat-model
description: "Threat model a system, feature, service, or PR using Shostack's 4Q workflow, evidence-first analysis, risk scoring, and CLI-friendly Mermaid helper scripts."
---

# Threat Model

## Purpose

Provide a repeatable, evidence-first threat modeling workflow for GitHub Copilot users who need durable Markdown output and Mermaid diagrams, including a fallback path for GitHub Copilot CLI users who cannot call the VS Code Mermaid Chart tools directly.

## When to use

Use this skill when you need to:

- threat model a repository, feature, architecture, or PR diff
- prepare a security architecture review with data flows and trust boundaries
- produce a 4Q report with actionable mitigations and a validation plan
- work from GitHub Copilot CLI and still validate Mermaid diagrams before publishing the report

## Inputs to collect

- in-scope components, deployables, and entry points
- deployment and reachability assumptions
- privileged roles and high-impact workflows
- sensitive data categories and likely consequence of misuse
- existing controls, especially authn/authz, ingress, logging, and environment isolation
- repository evidence for code paths, IaC, manifests, and configuration

## How to use

1. Collect repository evidence before relying on operator answers.
2. Ask only the branching intake questions that materially change exposure, privilege, or data-sensitivity scoring.
3. Draft the report in a root-level file named `Threat Model Review - YYYY-MM-DD.md`.
4. Use the bundled Mermaid helper scripts when the Mermaid Chart extension tools are unavailable:

   ```bash
   npm run threat-model:mermaid-docs -- --list
   npm run threat-model:mermaid-docs -- --type flowchart
   npm run threat-model:mermaid-docs -- --type sequenceDiagram
   npm run threat-model:mermaid-validate -- --file "Threat Model Review - 2026-04-15.md"
   ```

5. Fix Mermaid failures and rerun validation until the script exits successfully.
6. Deliver the final report plus a short PR-ready summary.

## Rules

- MUST use this evidence hierarchy for factual claims: repo-confirmed, runtime/deployment evidence, operator-stated, ASSUMPTION, UNKNOWN.
- MUST keep confirmed facts separate from inference.
- MUST ask 4-8 concise intake questions when reachability, privileged workflows, data sensitivity, or environment isolation are unclear.
- MUST produce at least these diagrams unless the repository clearly cannot support them: DFD Level 0, DFD Level 1, trust-boundary view, and top 2-3 sequence diagrams.
- MUST validate every Mermaid block before finalizing the report.
- MUST include at least 3 code-anchored or IaC-anchored findings that do not depend primarily on operator answers.
- MUST assign an overall application risk score from 0-100 with confidence, volatility, and top score drivers.
- MUST mark mitigations as PRESENT, ABSENT, or UNKNOWN.
- MUST mark threats as Mitigated, Partially Mitigated, Open, or Unknown based on whether controls materially close the exploit path.
- SHOULD prefer simple Mermaid syntax over advanced styling.
- SHOULD call out contradictions between repo evidence and operator statements before finalizing prioritization.
- MAY omit optional diagrams when the repository does not expose the needed evidence; label the gap as UNKNOWN.

## Step-by-step process

1. **Triage and calibrate risk**
   - Identify the primary application surface, deployables, and datastore paths.
   - Classify reachability first: internal, mixed, partner-reachable, or public.
   - Capture repo-confirmed versus operator-stated exposure details separately.
2. **Q1: What are we working on?**
   - Summarize system purpose, components, identities, assets, and trust boundaries.
   - Rank key flows by sensitivity, privilege, and exposure.
   - Draft DFD Level 0 and Level 1 diagrams.
3. **Q2: What can go wrong?**
   - Enumerate flow-specific threats with STRIDE and OWASP mapping.
   - Include abuse cases for admin paths, bulk actions, impersonation, exports, webhooks, and downstream triggers where relevant.
   - Preserve at least 2-3 high-confidence threats directly anchored in code or IaC.
4. **Q3: What are we going to do about it?**
   - Evaluate controls as PRESENT, ABSENT, or UNKNOWN.
   - Distinguish direct mitigations from adjacent hygiene controls.
   - Recommend practical fixes with expected effort and blast-radius reduction.
5. **Q4: Did we do a good job?**
   - Build a validation plan with 3-6 scenarios.
   - Include one scenario for a code-evidenced weakness, one for an operator-stated assumption, and one for privileged workflow misuse.
6. **Validate diagrams and finish the report**
   - Run the helper scripts for Mermaid docs and validation.
   - Confirm that diagram evidence, findings, scoring, and validation scenarios are internally consistent.

## Mermaid helper scripts

The skill includes these local scripts under `skills/threat-model/scripts/`:

- `mermaid-docs.mjs`: prints concise syntax guidance and common pitfalls for supported diagram types.
- `validate-mermaid.mjs`: validates Mermaid blocks in Markdown reports or standalone diagram files using deterministic preflight checks.

Supported diagram types:

- `flowchart`
- `sequenceDiagram`
- `classDiagram`
- `erDiagram`

Validation expectations:

- the first meaningful line must declare a supported Mermaid diagram type
- flowcharts must not mix sequence-diagram grammar
- sequence diagrams must not mix flowchart grammar and must close structured blocks with `end`
- Markdown reports may contain multiple Mermaid blocks; each block is validated independently

## Output format

Produce a Markdown report with these sections:

1. Executive summary
2. Risk score
3. Scope
4. Exposure and risk calibration
5. Contradictions and reconciliation
6. Assumptions and unknowns
7. Architecture and data flows with validated diagrams
8. Key flows
9. Threats table
10. Mitigations table
11. High-risk interaction sequences
12. Validation plan
13. Owners
14. Open questions

Required tables:

- threats table: `ID | Flow | Summary | STRIDE | OWASP | Likelihood | Impact | Status | Rationale`
- mitigations table: `Threat ID | Mitigation | Status | Directness | Location/Evidence | Notes/Open questions`

Required scoring fields:

- overall application risk score
- risk band
- confidence
- score volatility
- primary score drivers
- what would raise or lower the score

## Examples

### Example: CLI-first threat model workflow

```bash
npm run threat-model:mermaid-docs -- --type flowchart
npm run threat-model:mermaid-docs -- --type sequenceDiagram
npm run threat-model:mermaid-validate -- --file "Threat Model Review - 2026-04-15.md"
```

Expected outcome:

- the docs command prints the required header, allowed constructs, and common pitfalls
- the validation command reports each Mermaid block as `PASS` or fails with block-specific errors

### Example: threat model output goals

- Top findings are prioritized by real reachability, privilege, and blast radius.
- Evidence is anchored to repository files, symbols, and line ranges when available.
- Unknowns include an owner and a question that can be answered later.