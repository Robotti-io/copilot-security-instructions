# Copilot authoring guidelines for customization Markdown files

These instructions apply when you create or edit any of the following files:

- `agents/*.agent.md`
- `prompts/*.prompt.md`
- `instructions/*.instructions.md`
- `skills/**/SKILL.md`

## General Markdown rules

- Use ATX headings (`#`, `##`, `###`) and keep a clean hierarchy (one `#` at top).
- Prefer short paragraphs and bullet lists; avoid overly long blocks of text.
- Use fenced code blocks for any code or config. Label the fence language (`yaml`, `bash`, `json`, `md`, etc.).
- Never place YAML frontmatter anywhere except the very top of the file.
- Always separate YAML frontmatter from body with a blank line after the closing `---`.
- Keep instructions unambiguous, testable, and scoped:
  - Use “MUST / SHOULD / MAY” for requirements.
  - Add acceptance criteria when helpful.
- Avoid contradictions across files. If two instruction files could both apply, ensure they agree.

## YAML frontmatter conventions

- Use `---` on the first line and `---` to close the frontmatter block.
- Prefer quoted strings when values contain special characters (`:`, `*`, `{}`, `#`, `@`, etc.).
- Use lower-kebab-case for identifiers (e.g., `name: markdown-authoring`).

## Authoring standards per file type

### A) Custom agent profiles: `agents/*.agent.md`

- Frontmatter MUST include:
  - `description` (required)
  - `name` (recommended; otherwise filename is used)
- Frontmatter MAY include:
  - `tools` (list of tool names/aliases)
  - `model` (IDE-supported)
  - `target` (`vscode` or `github-copilot`), if you want environment-specific availability
- Body MUST:
  - Define the agent’s role, boundaries, and output format expectations.
  - State what the agent should do when missing info (ask concise questions or propose safe defaults).
  - Include formatting rules for produced Markdown (headings, lists, code fences, links).
- Keep the agent prompt focused on a single domain (e.g., “authoring Copilot customization files”).

### B) Prompt files: `prompts/*.prompt.md`

- Frontmatter SHOULD include:
  - `description` (short, action-oriented)
  - `agent` (when you want agent mode behavior)
- Body MUST:
  - Start with the goal in one sentence.
  - Use `${input:<name>:<prompt>}` placeholders for required parameters.
  - Specify a deterministic output structure (headings + bullet lists).
- Ensure the prompt can be invoked as `/<filename-without-.prompt.md>`.

### C) Path-specific instructions: `instructions/*.instructions.md`

- Frontmatter MUST include:
  - `applyTo: "<glob pattern(s)>"`
- Frontmatter MAY include:
  - `excludeAgent: "code-review"` or `"coding-agent"` if only one should read it
- Body MUST:
  - Describe exactly what to do for files matching `applyTo`.
  - Contain rules that are compatible with repo-wide instructions.

### D) Skills: `skills/<skill-dir>/SKILL.md`

- File MUST be named `SKILL.md`.
- Frontmatter MUST include:
  - `name` (lowercase, hyphenated)
  - `description` (when to use this skill)
- Body MUST:
  - Provide step-by-step guidance, examples, and “do/don’t” lists.
  - Include any scripts/resources in the same directory by relative path.

## Output requirements when generating/editing these files

- When proposing changes, output the full file contents in a single fenced `md` code block.
- If editing an existing file, describe the minimal set of changes before showing the updated file.
- Never invent tool names, file paths, or capabilities—use what exists in the repo.
