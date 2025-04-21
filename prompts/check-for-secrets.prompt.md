# 🔐 Prompt: Hardcoded Secrets & Credential Audit

Act as a secure code reviewer analyzing this file for **hardcoded secrets**, API keys, tokens, credentials, or other sensitive information.

Flag any of the following patterns:

- API keys, access tokens, client secrets, or passwords embedded as string literals
- Usage of `process.env` in frontend code or without proper runtime protection
- Sensitive values written to `.env`, `.properties`, or `appsettings.json` files without secret management
- OAuth tokens, JWTs, or HMAC secrets stored or logged in plaintext
- Secrets stored in comments, JSON blobs, test configs, or logs

Highlight these with comments or suggested changes. Recommend usage of a secure vault (e.g. Azure Key Vault, AWS Secrets Manager, CyberArk Conjur) and explain the risk of each finding.
