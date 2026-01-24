---
agent: "security-prompt-engineer"
description: "Generate a new Agent Skill (directory + SKILL.md) with correct frontmatter, structure, and examples."
---

Goal: Create a new Agent Skill that teaches Copilot how to perform a specialized task in this repository.

Inputs:
- Skill name (kebab-case): ${input:skill_name:Enter the skill identifier (e.g., api-docs-review)}
- When to use it: ${input:when_to_use:Describe the scenarios where Copilot should use this skill}
- Key steps: ${input:key_steps:List the steps the skill should follow (bullets are fine)}
- Examples needed: ${input:examples:What examples should be included?}

Output requirements:
- Create the directory: `skills/${input:skill_name:...}/`
- Output a complete `SKILL.md` file with:
  - YAML frontmatter (`name`, `description`, optional `license`)
  - Sections: Purpose, When to use, Procedure, Do/Don’t, Examples
- Keep it actionable, deterministic, and aligned with repo conventions.
