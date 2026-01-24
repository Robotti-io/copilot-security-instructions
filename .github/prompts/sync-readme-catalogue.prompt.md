---
agent: "appsec-library-maintainer"
description: "Ensure README prompt catalogue matches the actual prompts/ directory; propose the exact README edits needed."
---

Goal: Keep the README prompt catalogue accurate and complete.

Procedure:
  
1. List all files in `prompts/`.
2. Compare against the README’s prompt table.
3. Identify:
   - missing entries
   - stale or broken links
   - inconsistent descriptions or titles
4. Propose exact README edits.

Output:

- Summary of mismatches
- A patch-style snippet or full updated README section

Constraints:

- Do not rename prompts unless explicitly requested; prefer updating the README to match reality.
