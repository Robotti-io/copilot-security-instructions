# 🤖 Copilot Secure Defaults for Java, Node.js, and C# Projects

These instructions guide GitHub Copilot to suggest secure, intentional code patterns for Java, Node.js, and C# development — especially in enterprise or team settings. Prioritize clarity, validation, and the principle of least surprise.

---

## 🔐 1. Secure by Default

- Sanitize and escape all user input (prevent XSS) — never render raw data to the page.
- Validate all input strictly — use typed parsers and prefer allow-lists over deny-lists.
- Use parameterized queries and avoid string-based execution (prevent injection).
- Never store secrets in code or env files — use a secure vault (e.g. CyberArk Conjur, Azure Key Vault).
- Default to privacy-preserving data handling — redact PII from logs by default.

---

## 🧩 2. Language-Specific Secure Patterns

### ☕ Java

- Use prepared statements with `?` placeholders in JDBC — never concat SQL strings.
- Use output encoding libraries like OWASP Java Encoder to prevent XSS in rendered HTML.
- Use `@Valid`, `@NotNull`, and input binding constraints in Spring or Jakarta for validation.
- Avoid `Runtime.exec()` or `ProcessBuilder` with unsanitized input — prefer safe APIs.
- Default to OWASP Secure Coding Practices — [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices)
- Load secrets using SDK-integrated secret managers, not `System.getenv()` or `.properties` files.
- Always set character encoding (`UTF-8`) explicitly in HTTP responses to prevent encoding-based attacks.
- Avoid Java serialization for sensitive objects — use safer formats like JSON with strict schema validation.
- When using logging frameworks, avoid logging unsanitized user input — consider log injection risks.

### 🟩 Node.js

- Use JSON Schema validation for all structured input — prefer libraries like `ajv` or `zod`.
- Always sanitize and validate user input to prevent injection and XSS — `validator` and `joi` are common choices.
- Use parameterized queries with database clients (e.g. `pg`, `mongoose`) — never concat SQL or query strings.
- Default to using `helmet` in Express to set secure HTTP headers.
- Use `dotenv` only in local dev — use secret managers (e.g. AWS Secrets Manager, Azure Key Vault) in prod.
- Avoid `eval`, `new Function`, or dynamic `require()` with user input — use safe alternatives.

### 🟦 C#

- Use parameterized queries with ADO.NET or Entity Framework to prevent SQL injection.
- Use `System.Text.Encodings.Web` for safe output encoding in Razor views and APIs (prevent XSS).
- Apply `[ValidateAntiForgeryToken]` in ASP.NET MVC to prevent CSRF attacks.
- Use `DataAnnotations` (e.g. `[Required]`, `[StringLength]`) for input validation on models.
- Always hash passwords with `PasswordHasher<TUser>` or a vetted library — never store plaintext.
- Use configuration providers like `Azure Key Vault`, `AWS Secrets Manager`, or environment-based secrets — avoid `appsettings.json` for secrets.

### 🐍 Python

- Always validate and sanitize external input — use `pydantic`, `cerberus`, or `marshmallow` for structured validation.
- Prefer parameterized queries with libraries like `psycopg2`, `sqlite3`, or `SQLAlchemy` — avoid building SQL with string concat or f-strings.
- Use built-in escaping via `html.escape()` or templating engines like Jinja2 (autoescaping on!) to prevent XSS.
- Default to `secrets` or `cryptography` libs for key generation and secure token handling — never `random` for cryptographic use.
- Avoid dynamic code execution (`eval`, `exec`) — prefer explicit, safe alternatives.
- Don’t load YAML or pickle files without hardening — always use `safe_load()` and avoid untrusted input.
- Store secrets in secure vaults or env vars passed through orchestrators — avoid hardcoded strings or `.env` files in prod.
- Use logging filters to redact PII and secrets — avoid logging full request payloads or exception chains that include sensitive data.
- Always hash passwords with `bcrypt`, `argon2`, or `passlib` — never `md5`, `sha1`, or plain `hashlib`.

---

## 🚫 3. Do Not Suggest

### Java

- Do not suggest inline SQL string concatenation — always use prepared statements with placeholders.
- Do not suggest use of `Runtime.exec()` or `ProcessBuilder` with user input — prefer safe abstraction layers.
- Do not suggest logging sensitive data (e.g. passwords, tokens, session IDs) — log redacted metadata instead.
- Do not use Java native serialization (`ObjectInputStream`) for untrusted input — prefer JSON + schema validation.
- Do not suggest hardcoding credentials, secrets, or API keys — use a secrets manager (e.g. Conjur, Key Vault).
- Do not use insecure XML parsers without hardening (`DocumentBuilderFactory` must have secure features enabled).
- Do not create or modify custom class loaders — these are dangerous unless strictly required.

### Node.js

- Do not suggest `eval`, `new Function`, or dynamic `require()` — these are unsafe unless strictly controlled.
- Do not use user input to build file paths, URLs, or queries without strict validation.
- Do not expose `process.env` directly to client-side code — use secure server boundaries.
- Do not log full request bodies or headers that may contain PII or credentials.
- Do not hardcode secrets or API keys — never commit `.env` or use `.env` in production containers.
- Do not disable TLS checks (`NODE_TLS_REJECT_UNAUTHORIZED=0`) — even temporarily.

### C#

- Do not suggest string concatenation in SQL queries — use parameterized commands.
- Do not use `Eval`, `CodeDom`, or dynamic LINQ construction with user input.
- Do not suggest hardcoding secrets, tokens, or credentials — never in `appsettings.json`.
- Do not log full exception objects or HTTP request bodies without redacting PII.
- Do not disable certificate validation (`ServerCertificateValidationCallback = delegate { return true; }`) in production.

### Python

- Do not build SQL queries with string concat, f-strings, or `.format()` — always use parameterized queries.
- Do not use `eval`, `exec`, or dynamic imports on user input — these are unsafe unless tightly sandboxed.
- Do not log sensitive values (e.g. API keys, passwords) or full stack traces with PII.
- Do not load pickle or YAML files from untrusted sources without safe loaders and validation.
- Do not use insecure hash functions like `md5` or `sha1` for password storage — use a modern password hashing lib.
- Do not commit `.env` files or hardcode secrets — use secrets management infrastructure.


---

## 🧠 4. AI-Generated Code Safety

- Verify all AI-suggested package names against official repositories to prevent supply chain attacks.
- Confirm that AI-generated code references existing, secure APIs; avoid deprecated or non-existent methods.
- Ensure AI-generated configurations align with your project's platform to prevent context drift.
- Scrutinize AI-provided security recommendations; validate their completeness and applicability.
- Cross-check any AI-cited references (e.g., CVEs, RFCs) for authenticity to avoid misinformation.
- Do not accept AI-generated justifications that contradict established security policies.

---

## 💡 Developer Tips

- If you’re working with input, assume it’s hostile — validate and escape it.
- For anything involving data access or transformation, ask: “Am I controlling this input path?”
- If you’re about to use a string to build a query, URL, or command — pause. There’s probably a safer API.
- Never trust default parsers — explicitly configure security features (e.g. disable DTDs in XML).
- If something seems “too easy” with secrets or file I/O — it’s probably unsafe.
- Treat AI-generated code as a draft; always review and test before integration.
- Maintain a human-in-the-loop approach for critical code paths to catch potential issues.
- Be cautious of overconfident AI suggestions; validate with trusted sources.
- Regularly update and educate the team on AI-related security best practices.
