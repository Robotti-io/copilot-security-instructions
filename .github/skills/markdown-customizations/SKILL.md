---
name: markdown-customizations
description: Use this skill when creating or editing GitHub Copilot customization Markdown files (agent profiles, prompt files, instruction files, and skills).
license: CC0-1.0
---

# Markdown Customizations Skill

## Purpose

Help create and maintain Copilot customization files with correct structure and consistent, high-signal instructions.

## When to use

Use this skill when working on any of:

- `agents/*.agent.md`
- `prompts/*.prompt.md`
- `instructions/*.instructions.md`
- `skills/**/SKILL.md`

## Procedure

1. Identify the target file type and verify the correct path + extension.
2. Add YAML frontmatter at the top with required keys.
3. Write the body using this structure:
   - `# Title`
   - `## Purpose`
   - `## How to use`
   - `## Rules` (MUST/SHOULD/MAY)
   - `## Examples` (at least one when ambiguity is likely)
4. Validate glob patterns for `.instructions.md` files.
5. Ensure no contradictions with repo-wide `copilot-instructions.md`.

## Do / Don’t

### Do

- Use short, testable rules (e.g., “MUST include `description` in agent profiles”).
- Provide one minimal realistic example for each “pattern” (agent/prompt/instructions/skill).
- Use fenced code blocks with `yaml` or `md` tags.

### Don’t

- Don’t put YAML anywhere except the initial frontmatter block.
- Don’t create `skill.md`; the file must be named `SKILL.md`.
- Don’t introduce conflicting guidance across multiple instruction files.

## Examples

### Agent profile frontmatter example

```yaml
---
name: my-agent
description: Short description of what this agent does
tools: ["read", "search", "edit"]
---
```

### Path-specific instructions frontmatter example

```yaml
---
applyTo: ".github/prompts/**/*.prompt.md"
excludeAgent: "code-review"
---
```

### Prompt file frontmatter example

```yaml
---
agent: "agent"
description: "One-line description of what this prompt does"
---
```