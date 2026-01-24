---
applyTo: "agents/*.agent.md,prompts/*.prompt.md,skills/**/SKILL.md,README.md,copilot-instructions.md"
---

# Security library authoring rules (this repo)

These rules apply to the **root-level library content** intended for AppSec “shift-left” use.

## Global requirements

- Prefer deterministic, repeatable workflows.
- Always require evidence:
  - reference exact file paths and (when possible) line ranges
  - avoid speculative conclusions
- Avoid insecure “quick fixes”:
  - do not recommend disabling security controls as the primary solution
  - if a risky workaround is mentioned, it must be explicitly labeled temporary with safer alternatives

## Root prompt files: `prompts/*.prompt.md`

- MUST include these sections:
  - `## ✅ Context / Assumptions`
  - `## 🔍 Procedure`
  - `## 📦 Output Format`
  - `## ✅ Quality checks`
- MUST define an output schema that is easy to paste into issues/PRs:
  - Findings list/table
  - Severity / likelihood
  - Evidence
  - Remediation
  - Verification steps

## Skills: `skills/**/SKILL.md`

- MUST include YAML frontmatter with `name` and `description`.
- MUST include:
  - When to use
  - Inputs to collect
  - Step-by-step process
  - Output format
  - Examples

## Agents: `agents/*.agent.md`

- MUST include YAML frontmatter with `description`.
- MUST define:
  - operating principles
  - how to handle missing info
  - output format expectations (findings, fixes, verification)

## README

- Prompt catalogue SHOULD include every file in `prompts/` with a one-line description and intended use.
