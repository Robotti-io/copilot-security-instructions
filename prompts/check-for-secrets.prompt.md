# 🔐 Prompt: Hardcoded Secrets & Credential Audit

## ✅ Context / Assumptions

- You can read project files in this workspace.
- Do **not** print or re-output any real secrets you find. Redact values (e.g., show only prefixes).
- Do **not** modify files; report findings and remediation guidance only.
- Prefer evidence-first: cite file paths and (when possible) line ranges.

## 🔍 Procedure

1. Scan for hardcoded credentials/tokens/keys (string literals, config files, test data).
2. Check “near-secrets” patterns:
    - JWT/HMAC secrets, OAuth client secrets, connection strings
    - private keys, certificates, signing material
3. Check risky usage patterns:
    - secrets in logs
    - secrets in frontend bundles
    - `.env` or local config patterns being used in prod paths
4. For each finding, determine:
    - type of secret, where it flows, exposure surface (repo, logs, client)
5. Recommend a secure storage and rotation approach (vault/secret manager) and verification steps.

## 📦 Output Format

Return Markdown with:

- **Summary**: count of potential secrets + top risks
- **Findings** table: Type | Severity | Where | Evidence | Recommendation | Verification
- **Rotation & containment plan** (bullets): revoke/rotate, invalidate sessions, monitor usage

## ✅ Quality checks

- Do not include raw secret values.
- Findings include concrete code locations.
- Remediation includes both (1) removing the secret from code and (2) rotating/revoking it.
