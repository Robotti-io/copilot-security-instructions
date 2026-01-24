# 🛡️ Prompt: Input Validation & Sanitization Audit

## ✅ Context / Assumptions

- You can read project files in this workspace.
- Prefer evidence-first: cite file paths and (when possible) line ranges.
- Do **not** modify files; provide findings and remediation guidance only.

## 🔍 Procedure

1. Inventory untrusted inputs:
    - HTTP params/path/query/body/headers, file uploads, message payloads, env/CLI.
2. Identify validation boundaries:
    - middleware/controllers/DTO binding, schema validators.
3. Flag high-risk patterns:
    - unvalidated inputs reaching sensitive sinks (DB, templates, commands, file paths)
    - implicit coercion, missing bounds, regex ReDoS risk
    - missing allow-lists for enums/keys
4. Recommend hardening:
    - schema-based validation, canonicalization, rejecting unknown fields
    - contextual output encoding
5. Provide verification steps/tests for each fix.

## 📦 Output Format

Return Markdown with:

- **Summary**: top 3 validation gaps + overall risk
- **Findings** (repeat):
  - **Issue**:
  - **Severity / Likelihood**:
  - **Where**:
  - **Evidence**:
  - **Recommendation**:
  - **Verification**:
- **Suggested validation boundary**: where validation should live (and why)

## ✅ Quality checks

- Findings trace data flow from input → sink.
- Each recommendation is specific enough to implement.
- Evidence includes concrete code locations.
