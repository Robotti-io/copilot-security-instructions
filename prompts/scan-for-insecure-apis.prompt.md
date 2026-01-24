---
agent: "application-security-analyst"
name: scan-for-insecure-apis
description: "Scan for insecure or deprecated API usage and suggest safer alternatives."
---

# ⚠️ Prompt: Insecure or Deprecated API Usage Scan

## ✅ Context / Assumptions

- You can read project files in this workspace.
- Prefer evidence-first: cite file paths and (when possible) line ranges.
- Do **not** modify files; report findings and safer alternatives only.

## 🔍 Procedure

1. Search for high-risk APIs across languages/frameworks in the repo.
2. For each usage, determine:
    - is input attacker-controlled?
    - what is the sink/impact (RCE, injection, data exposure, SSRF, DoS)?
    - is there a safe wrapper or mitigation already?
3. Recommend safer alternatives and explicit mitigation conditions.

## 📦 Output Format

Return Markdown with:

- **Summary**: top 3 risky APIs + overall risk
- **Findings table**: API | Risk | Severity | Where | Evidence | Safer alternative | Verification
- **Notes**: cases where usage might be acceptable with strict mitigations (state the mitigations required)

## ✅ Quality checks

- Each finding explains the risk in this repo’s context, not generically.
- Recommendations include at least one concrete safer alternative.
- Evidence includes file paths (+ line ranges if available).
