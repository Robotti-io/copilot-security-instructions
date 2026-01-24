---
agent: "appsec-library-maintainer"
description: "Refactor a specific library file (agent/prompt/skill) to match the repo’s security authoring standards while keeping minimal diffs."
---

Goal: Improve one specific library item in this repo with minimal diffs.

Inputs:

- Target file path: ${input:file_path:Enter the file path (e.g., prompts/check-for-secrets.prompt.md)}
- Improvement goal: ${input:goal:What should improve? (e.g., clearer output format, add evidence requirements, reduce ambiguity)}

Procedure:

1. Read the target file.
2. Identify the smallest changes that achieve the goal while preserving intent.
3. Ensure it follows the relevant template:
   - Root prompt: sections + deterministic output format
   - Skill: frontmatter + procedure + examples
   - Agent: frontmatter + operating principles + output requirements
4. Add “verify/don’t assume” safeguards:
   - require citing exact files/lines
   - do not allow hallucinated libraries/APIs
5. Output the updated file as complete contents.

Output:

- Bullet list of changes (3–7 bullets)
- Updated file in a single fenced `md` code block
