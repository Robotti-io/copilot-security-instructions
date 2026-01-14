# Custom Agents

This folder contains **GitHub Copilot custom agent profiles** (`*.agent.md`) that you can select in Copilot agent mode or Copilot coding agent.

Agent profiles are Markdown files with YAML frontmatter (`name`, `description`, optional `tools`) followed by the agent prompt. See GitHub's custom agents documentation for details.

## Included agents

- `application-security-analyst` — read-only security review + findings
- `application-security-engineer` — implement security fixes + tests
- `application-security-architect` — threat modeling + guardrails + ADRs

## Recommended usage

- Use **Analyst** to generate findings and a remediation plan.
- Hand off to **Engineer** to implement fixes and add tests.
- Use **Architect** for new features, platform patterns, and team-wide guardrails.
