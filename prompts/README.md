# Prompts

This folder contains **GitHub Copilot prompt files** (`*.prompt.md`) for repeatable AppSec “shift-left” workflows.

These prompts are designed to be copied into a consuming repository at:

- `.github/prompts/`

Each prompt is a Markdown file with YAML frontmatter (typically `agent`, `name`, `description`) followed by the prompt body.

## Included prompts

- [add-content-security-policy.prompt.md](add-content-security-policy.prompt.md) — design and roll out a new CSP
- [assess-logging.prompt.md](assess-logging.prompt.md) — audit logs for sensitive data exposure
- [business-logic-review.prompt.md](business-logic-review.prompt.md) — map business logic flows and identify abuse risks
- [check-access-controls.prompt.md](check-access-controls.prompt.md) — review authorization enforcement and IDOR risk
- [check-for-secrets.prompt.md](check-for-secrets.prompt.md) — scan for hardcoded secrets and credential leaks
- [check-for-unvalidated-genai-acceptances.prompt.md](check-for-unvalidated-genai-acceptances.prompt.md) — detect unvalidated AI-generated code/dependencies
- [csp-review.prompt.md](csp-review.prompt.md) — review an existing CSP for deployability and XSS resistance
- [dependency-cve-triage.prompt.md](dependency-cve-triage.prompt.md) — triage a dependency CVE with reachability and remediation
- [review-auth-flows.prompt.md](review-auth-flows.prompt.md) — review authentication/session/token flows
- [scan-for-insecure-apis.prompt.md](scan-for-insecure-apis.prompt.md) — locate insecure/deprecated API usage
- [secure-code-review.prompt.md](secure-code-review.prompt.md) — end-to-end secure code review findings template
- [threat-model.prompt.md](threat-model.prompt.md) — 4Q threat model with mitigations and validation plan
- [validate-input-handling.prompt.md](validate-input-handling.prompt.md) — audit input validation boundaries and risky sinks

## Recommended usage

- Start with the `application-security-orchestrator` agent to route to the right workflow.
- Prefer evidence-first outputs (file paths and line ranges when possible).
- Keep outputs deterministic and reusable (tables/templates).
