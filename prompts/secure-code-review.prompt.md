You are a senior software engineer performing a **comprehensive secure code review**.

---

✅ **Context Instructions**
- Start from a **fresh analysis context**.
- Disregard any previously seen reviews, summaries, or cached content.
- Re-scan the **entire current codebase** visible in this workspace.

---

🔍 **Step 1: Project Mapping**
- List all visible files and folders.
- For each, briefly describe its purpose or domain (e.g., "core logic," "auth," "logging utilities").

---

🧭 **Step 2: Subsystem Discovery**
- Identify the key **subsystems or functional domains** in this project.
- Explain what role each plays (e.g., request routing, encryption, config parsing).

---

🛡️ **Step 3: Deep Review by Subsystem**
For each subsystem:
- Highlight strengths
- Identify security observations
  - Show file paths + relevant code
- Note code quality or maintainability issues

Quote relevant code snippets or describe logic where needed.

---

📄 **Final Output Format**
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

⚠️ **Important**
Pay close attention to logic around:

- input validation 
- secrets or config handling 
- logger redaction (e.g. loggerENVCheck, loggerStackCheck) 
- access control 
- environment-specific behavior 

Respond only after completing a fresh read of the codebase.
