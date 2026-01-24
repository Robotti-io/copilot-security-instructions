---
agent: "markdown-customizations"
name: review-prompt-frontmatter
description: "Review root-level prompt files for required YAML frontmatter keys (agent, name, description) and correct structure; propose exact patches."
---

Goal: Audit this repository’s **root-level** prompt files (`prompts/*.prompt.md`) to ensure they include correct YAML frontmatter and required keys.

Required YAML frontmatter (must be at top of file, first content):

```yaml
---
agent: "<AGENT_NAME_FROM_IDEAL_AGENT_IN_AGENTS_FOLDER>"
name: <PROMPT_NAME>
description: <PROMPT_DESCRIPTION>
---
```

Rules:

- The file MUST start with YAML frontmatter delimited by `---` lines.
- Frontmatter MUST include **all three keys**: `agent`, `name`, `description`.
- `agent` MUST match the **name** of an ideal agent defined in the repo’s root `agents/` folder (use one of their `name:` values).
- `name` MUST be kebab-case and SHOULD match the filename (without `.prompt.md`) unless there is a strong reason.
- `description` MUST be a concise one-liner (imperative or action-oriented) describing what the prompt does.
- After the closing `---`, there MUST be a blank line, then the Markdown body.
- Do not modify the prompt body unless needed to fix broken structure (e.g., frontmatter misplaced, heading duplicated, etc.).

Process:

1. Inventory all `agents/*.agent.md` and collect allowed agent names from their YAML frontmatter (`name:`).
2. Inventory all `prompts/*.prompt.md`.
3. For each prompt file, check:
   - YAML frontmatter exists and is the first content
   - keys `agent`, `name`, `description` exist
   - `agent` is one of the allowed agent names
   - `name` is kebab-case and matches filename (recommended)
4. Produce a report and patches.

Output format:

- `## Summary`
  - counts: total prompts, compliant, non-compliant
- `## Findings`
  - one subsection per non-compliant file:
    - Problem(s)
    - Proposed fix (bullets)
    - Full corrected file contents in a fenced `md` code block
- `## Optional improvements`
  - suggestions that are NOT required (e.g., align `name` with filename)

Constraints:

- Make minimal diffs.
- Do not invent agents; only use agent names that exist in `agents/`.
- If a prompt is missing frontmatter, add it without changing body content (unless required to move content below frontmatter).

