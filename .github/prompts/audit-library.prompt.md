---
agent: "appsec-library-maintainer"
description: "Audit the repository’s root-level Copilot security library (agents/, prompts/, skills/, README, copilot-instructions) and propose prioritized improvements with concrete patches."
---

Goal: Review this repository as a Copilot security content library and propose improvements that increase clarity, consistency, and effectiveness for AppSec “shift-left” workflows.

Scope to audit:

- Root content:
  - `agents/*.agent.md`
  - `prompts/*.prompt.md`
  - `skills/**/SKILL.md`
  - `copilot-instructions.md`
  - `README.md`

Process:

1. Inventory: List all library items grouped by type (agents, prompts, skills).
2. Consistency checks:
   - naming conventions
   - required frontmatter presence (agents + skills)
   - prompt structure consistency (sections + output format)
3. Content checks:
   - evidence-first guidance (cite files/lines)
   - anti-hallucination safeguards
   - safe remediation guidance (no risky bypass advice)
   - output formats are deterministic and reusable
4. README checks:
   - prompt catalogue completeness
   - link correctness
   - missing/duplicate entries

Output format:

- **P0 / P1 / P2** prioritized backlog
- For each item:
  - Problem (1–2 sentences)
  - Proposed change (bullets)
  - Concrete patch (updated file content or diff-style snippet)
- If there are typos/broken conventions, include “quick fixes” section at top.

Constraints:
- Do not invent files that are not present unless you explicitly propose adding them and justify why.
- If you recommend new files, provide full contents.
