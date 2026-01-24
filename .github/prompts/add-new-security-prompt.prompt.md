---
agent: "security-prompt-engineer"
description: "Generate a new root-level security prompt (prompts/*.prompt.md) that matches the library’s structure and produces deterministic outputs."
---

Goal: Create a new security-focused prompt file for this library.

Inputs:

- Prompt filename (kebab-case): ${input:filename:Example: ssrf-review.prompt.md}
- Prompt title: ${input:title:Example: SSRF Review}
- Target vulnerabilities / theme: ${input:theme:Example: SSRF + egress controls + URL parsing}
- Intended use case: ${input:use_case:Example: Review a service that fetches remote URLs from user input}
- Output artifact needed: ${input:output:Example: Findings table + recommended fixes + verification steps}

Requirements:

- Create: `prompts/${input:filename:...}`
- Use the library’s root prompt template:
  - Title
  - Context/Assumptions
  - Procedure
  - Output Format (deterministic headings/fields)
  - Quality checks (evidence-first + anti-hallucination)
- Include at least one concrete example of the expected output format.

Output:

- Brief explanation (why this prompt is useful)
- Full file contents in a fenced `md` block
