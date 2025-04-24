# 🛡️ CoPilot Security Instructions

A customizable `.github/copilot-instructions.md` file that guides **GitHub Copilot** toward **secure coding defaults** across **Java, Node.js, and C#**.

Designed for security-conscious development teams, this config helps Copilot suggest safer code patterns, avoid common vulnerabilities, and reinforce good practices — without slowing down your workflow.

---

## 🔐 What's Inside

This Copilot configuration includes:

- **Secure-by-default guidance** for all languages (input validation, secret handling, safe logging)
- **Language-specific secure patterns**:
  - ☕ Java
  - 🟩 Node.js
  - 🟦 C#
  - 🐍 Python
- **"Do Not Suggest" lists** to block risky Copilot completions (e.g. `eval`, inline SQL, insecure deserialization)
- **AI hallucination protections** (package spoofing, non-existent APIs, misinformation risks)
- **Mentorship-style dev tips** to help newer engineers build safe habits over time

---

## 🧠 Using Prompts for Code Reviews (Copilot Chat)

If your organization has [Copilot Prompt Customization](https://docs.github.com/en/copilot/customizing-github-copilot/prompts-for-github-copilot#using-reusable-prompts) enabled, you can guide Copilot Chat to run secure code audits using the included prompt files.

1. Open any file in your IDE (e.g., `tests/secret-hardcode.js`)
2. Open the Copilot Chat sidebar
3. Type:

```bash
@prompt .github/prompts/check-for-secrets.md
```

Copilot will scan the file using the selected prompt and return flagged issues, reasoning, and remediation tips.

> ℹ️ Note: If your org disables `chat.promptFiles`, you can manually paste the prompt contents into Copilot Chat or use them in PRs, checklists, and reviews.

---

## 🧪 Testing the Prompts

The `tests/` folder contains small, focused files designed to trigger specific security prompts:

| File                           | Targets                                  |
|--------------------------------|------------------------------------------|
| `secret-hardcode.js`           | check-for-secrets.md                    |
| `unvalidated-input.java`       | validate-input-handling.md              |
| `insecure-api.cs`              | scan-for-insecure-apis.md               |
| `logs-sensitive-data.go`       | assess-logging.md                       |
| `weak-auth-flow.ts`            | review-auth-flows.md                    |
| `overtrusted-genai-snippet.js` | unvalidated-genai-acceptances.md        |

To run a test:

1. Open a file in `tests/`
2. Run the related prompt in Copilot Chat
3. Review and refine based on Copilot’s feedback

---

## 📦 How to Use in a Real Project

1. Copy the `copilot-instructions.md` file into your repo under:  
   `.github/copilot-instructions.md`

2. Drop the prompts you want into:  
   `.github/prompts/`

3. Use prompt-driven reviews in Copilot Chat during coding, PRs, or audits

---

## 📚 Languages Supported

- ☕ **Java** — Spring, Jakarta, JDBC, OWASP Encoder
- 🟩 **Node.js** — Express, `pg`, `mongoose`, `helmet`, `ajv`, `zod`
- 🟦 **C#** — ASP.NET Core, Razor, ADO.NET, Entity Framework
- 🐍 **Python** — Flask, Django, `SQLAlchemy`, `pydantic`, `Jinja2`, `bcrypt`, `cryptography`

---

## 📣 Feedback & Contributions

This project is community-friendly and designed for continuous improvement.  
If you have suggestions, feedback, or language rules to contribute — feel free to open an issue or PR.

Let’s make Copilot safer, one suggestion at a time. 🛠️
