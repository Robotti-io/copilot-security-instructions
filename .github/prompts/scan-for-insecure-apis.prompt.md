# ⚠️ Prompt: Insecure or Deprecated API Usage Scan

Act as a secure code auditor. Your goal is to identify any usage of **insecure, deprecated, or high-risk APIs** that may introduce vulnerabilities or future instability.

Look for and flag the following patterns:

- Use of deprecated cryptographic functions (e.g. MD5, SHA1, `crypto.createCipher`, `System.Security.Cryptography.SHA1CryptoServiceProvider`)
- Legacy input/output APIs that lack sanitization or encoding features
- Insecure deserialization functions (e.g. `eval`, `JSON.parse` on external input, `ObjectInputStream`, `BinaryFormatter`)
- Unsafe file access or shell execution APIs (`fs.readFileSync` on user input, `Runtime.exec`, `ProcessBuilder`, `child_process.exec`)
- Unverified third-party libraries or packages not pinned to versions
- APIs that allow insecure HTTP communication (e.g. `http.get`, `fetch` without TLS, `WebClient` without `UseHttps`)

Explain:

- Why the API is dangerous
- What safer alternative is recommended
- When/if it’s okay to use with proper mitigation

Provide annotations or refactor suggestions where applicable.
