# 🤖 Prompt: Unvalidated GenAI Code Acceptance Audit

## ✅ Context / Assumptions

- You can read project files in this workspace.
- Prefer evidence-first: cite file paths and (when possible) line ranges.
- Do **not** modify files.
- The goal is to prevent “over-trust” of AI-generated code and hallucinated dependencies/APIs.

## 🔍 Procedure

1. Look for supply-chain red flags:
    - suspicious/new dependencies, packages that may not exist, unpinned versions.
2. Look for API correctness red flags:
    - calls to non-existent/undocumented APIs, copy/pasted snippets that don’t match project frameworks.
3. Look for validation and testing gaps:
    - newly added logic without tests, placeholder implementations, TODOs referencing AI.
4. Look for context drift:
    - config/code patterns that don’t match the repo’s infra stack.
5. Recommend verification steps:
    - confirm dependencies in official registries
    - run/build/test steps and add targeted tests
    - require human review for privileged/unsafe operations

## 📦 Output Format

Return Markdown with:

- **Summary**: top 3 risks + quick verification checklist
- **Findings** (repeat):
  - **Issue**:
  - **Severity / Likelihood**:
  - **Where**:
  - **Evidence**:
  - **Recommendation**:
  - **Verification**:
- **Verification checklist** (bullets): deps, APIs, tests, docs, config alignment

## ✅ Quality checks

- Findings are grounded in concrete evidence (not style-only opinions).
- Recommendations include a clear “how to verify” step.
- Avoid claiming a package/API is fake unless you can prove it; otherwise label as “needs verification”.
