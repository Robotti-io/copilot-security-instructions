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
