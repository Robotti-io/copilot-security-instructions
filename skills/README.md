# Agent Skills

This folder contains **Agent Skills** that Copilot (and other compatible agents) can load on-demand for specialized tasks.

Each skill lives in its own folder and contains a `SKILL.md` file (Markdown with YAML frontmatter: `name`, `description`, optional `license`).

## Included skills (high level)

- [secure-code-review](secure-code-review/SKILL.md)
- [authn-authz-review](authn-authz-review/SKILL.md)
- [input-validation-hardening](input-validation-hardening/SKILL.md)
- [dependency-cve-triage](dependency-cve-triage/SKILL.md)
- [secrets-and-logging-hygiene](secrets-and-logging-hygiene/SKILL.md)
- [genai-acceptance-review](genai-acceptance-review/SKILL.md)
- [threat-model-lite](threat-model-lite/SKILL.md)
- [secure-fix-validation](secure-fix-validation/SKILL.md)

Tip: keep skill names lowercase with hyphens; Copilot chooses skills based on the `description` field.
