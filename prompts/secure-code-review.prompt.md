---
agent: "application-security-architect"
name: secure-code-review
description: "Perform a comprehensive secure code review and report prioritized findings."
---

# 🛡️ Prompt: Secure Code Review

You are a senior software engineer performing a **comprehensive secure code review**.

---

## ✅ Context / Assumptions

- Start from a fresh analysis context.
- Prefer evidence-first: cite file paths and (when possible) line ranges.
- Do **not** modify files; report findings and recommendations only.
- If a PR diff is available, prioritize changed files first; expand repo-wide as needed.

## 🔍 Procedure

1. Map the project (entry points, trust boundaries, sensitive assets).
2. Identify key subsystems/domains and their responsibilities.
3. Review by subsystem, focusing on high-risk classes:
   - input validation, authn/authz, secrets/logging, crypto, deserialization, SSRF, dependency risks.
4. Produce prioritized findings with remediation and verification steps.

## 📦 Output Format

Return Markdown with this structure:

- **Summary**: scope reviewed, top 3 risks, overall risk
- **Strengths** (bullets)
- **Findings** (repeat):
  - **Issue**:
  - **Severity / Likelihood / Confidence**:
  - **Where**:
  - **Evidence**:
  - **Recommendation**:
  - **Verification**:
- **Suggested next steps**: quick wins (hours), medium (days), guardrails (weeks)

## ✅ Quality checks

- Each finding includes concrete evidence.
- Recommendations avoid “disable security controls” as the primary fix.
- Verification steps are actionable (test/request/scan).

---

## ✅ Context Instructions

- Start from a **fresh analysis context**.
- Disregard any previously seen reviews, summaries, or cached content.
- Re-scan the **entire current codebase** visible in this workspace.

---

## 🔍 Step 1: Project Mapping

- List all visible files and folders.
- For each, briefly describe its purpose or domain (e.g., "core logic," "auth," "logging utilities").

---

## 🧭 Step 2: Subsystem Discovery

- Identify the key **subsystems or functional domains** in this project.
- Explain what role each plays (e.g., request routing, encryption, config parsing).

---

## 🛡️ **Step 3: Deep Review by Subsystem**

For each subsystem:

- Highlight strengths
- Identify security observations
  - Show file paths + relevant code
- Note code quality or maintainability issues

Quote relevant code snippets or describe logic where needed.

---

## 📄 Final Output Format

Generate a single Markdown file named `REVIEW.MD` with the following structure:

```markdown
# 📋 Project Secure Code Review

## ✅ Strengths
- ...

## 🛡️ Security Observations
### [filename/path]
- **Issue**: ...
- **Impact**: ...
- **Recommendation**: ...

## 🔍 Code Quality Notes
- ...

## 🧭 Suggested Next Steps
- ...
```

## ⚠️ Important

Pay close attention to logic around:

- input validation
- secrets or config handling
- logger redaction (e.g. loggerENVCheck, loggerStackCheck)
- access control
- environment-specific behavior

Respond only after completing a fresh read of the codebase.
