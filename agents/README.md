# Custom Agents

This folder contains **GitHub Copilot custom agent profiles** (`*.agent.md`) that you can select in Copilot agent mode or Copilot coding agent.

Agent profiles are Markdown files with YAML frontmatter (`name`, `description`, optional `tools`) followed by the agent prompt. See GitHub's custom agents documentation for details.

## Included agents

- [application-security-orchestrator](application-security-orchestrator.agent.md) — entry point router; delegates to specialist agents
- [application-security-analyst](application-security-analyst.agent.md) — read-only security review + findings
- [application-security-engineer](application-security-engineer.agent.md) — implement security fixes + tests
- [application-security-architect](application-security-architect.agent.md) — threat modeling + guardrails + ADRs

## Recommended usage

- Start with **Orchestrator** to classify scope and guide handoffs.
- Use **Analyst** to generate findings and a remediation plan.
- Hand off to **Engineer** to implement fixes and add tests.
- Use **Architect** for new features, platform patterns, and team-wide guardrails.
