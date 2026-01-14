# Agent Skills

This folder contains **Agent Skills** that Copilot (and other compatible agents) can load on-demand for specialized tasks.

Each skill lives in its own folder and contains a `SKILL.md` file (Markdown with YAML frontmatter: `name`, `description`, optional `license`).

## Included skills (high level)

- `secure-code-review`
- `authn-authz-review`
- `input-validation-hardening`
- `dependency-cve-triage`
- `secrets-and-logging-hygiene`
- `genai-acceptance-review`
- `threat-model-lite`
- `secure-fix-validation`

Tip: keep skill names lowercase with hyphens; Copilot chooses skills based on the `description` field.
