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
- **An MCP server** to make using these prompts in other projects easier

---

## 🧠 Using Prompts for Code Reviews (Copilot Chat)

If your organization has [Copilot Prompt Customization](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental) enabled, you can guide Copilot Chat to run secure code audits using the included prompt files.

1. Open any file in your IDE (e.g., `tests/secret-hardcode.js`)
2. Open the Copilot Chat sidebar
3. Type:

```bash
@prompt .github/prompts/check-for-secrets.md
```

Copilot will scan the file using the selected prompt and return flagged issues, reasoning, and remediation tips.

> ℹ️ Note: If your org disables `chat.promptFiles`, you can manually paste the prompt contents into Copilot Chat or use them in PRs, checklists, and reviews.

## 🧪 Testing the Prompts

The `tests/` folder contains small, focused files designed to trigger specific security prompts:

| File                           | Targets                           |
|--------------------------------|-----------------------------------|
| `secret-hardcode.js`           | check-for-secrets.md              |
| `unvalidated-input.java`       | validate-input-handling.md        |
| `insecure-api.cs`              | scan-for-insecure-apis.md         |
| `logs-sensitive-data.go`       | assess-logging.md                 |
| `weak-auth-flow.ts`            | review-auth-flows.md              |
| `overtrusted-genai-snippet.js` | unvalidated-genai-acceptances.md  |

To run a test:

1. Open a file in `tests/`
2. Run the related prompt in Copilot Chat
3. Review and refine based on Copilot’s feedback

---

## 📦 How to Use in a Real Project

### Static Files

1. Copy the `copilot-instructions.md` file into your repo under:  
   `.github/copilot-instructions.md`

2. Drop the prompts you want into:  
   `.github/prompts/`

3. Use prompt-driven reviews in Copilot Chat during coding, PRs, or audits

### Leveraging the included MCP Server

The MCP server is designed to simplify the integration of secure coding prompts into your development workflow. Follow these steps to ensure a smooth experience:

#### 1. Setting Up the MCP Server

```bash
npm install
cp .env.example .env
npm start
```

- **`npm install`**: Installs all required dependencies.
- **`cp .env.example .env`**: Creates a `.env` file for configuration. Update it with your specific settings.
- **`npm start`**: Launches the MCP server on `http://localhost:8080/mcp`.

#### 2. Configuring VSCode for MCP

1. Open VSCode and run the `MCP: Open User Configuration` command.
2. Add the following JSON configuration:

   ```json
   {
      "servers": {
         "copilot-instructions-mcp": {
            "url": "http://localhost:8080/mcp"
         }
      }
   }
   ```

3. Save the configuration.
4. Navigate to the Extensions menu in VSCode.
5. Locate the `copilot-instructions-mcp` server, click the settings cog, and select `start server`.

#### 3. Using MCP with GitHub Copilot

- Open GitHub Copilot Chat.
- Ask it to run any of the prompts against your repository or specific files.
- Example: `Please requst and run the secure code review prompt using the`.

This setup ensures developers can easily leverage the MCP server to enhance their secure coding practices.

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
