---
applyTo: "agents/*.agent.md,prompts/*.prompt.md,instructions/*.instructions.md,skills/**/SKILL.md"
---

# Instructions for Copilot customization Markdown files

## Required structure

- YAML frontmatter MUST be the first content in the file, delimited by `---` lines.
- The body MUST start after the frontmatter and a blank line.
- Use consistent, predictable headings:
  - `# <Title>`
  - `## Purpose`
  - `## How to use`
  - `## Rules`
  - `## Examples` (when relevant)

## Frontmatter requirements by file type

### `.agent.md`

- MUST have `description`.
- SHOULD have `name`.
- MAY have `tools`, `model`, `target`, `mcp-servers` (when applicable).

### `.prompt.md`

- SHOULD have `description`.
- SHOULD have `agent` when the prompt is intended for agent mode.
- Use `${input:...}` placeholders for user-provided variables.

### `.instructions.md`

- MUST have `applyTo`.
- MAY have `excludeAgent` to limit to `"code-review"` or `"coding-agent"`.

### `SKILL.md`

- MUST have `name` (lowercase-hyphenated) and `description`.
- Keep the skill directory name lowercase and hyphenated.

## Markdown formatting rules

- Prefer bullet lists for rules. Use “MUST/SHOULD/MAY”.
- Include at least one concrete example for non-trivial behaviors.
- Keep examples minimal but realistic.
- Use fenced code blocks with language tags.
