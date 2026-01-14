---
name: genai-acceptance-review
description: Review workflow for AI/LLM output usage to prevent over-trust, injection, and unsafe automation.
---

Use this skill when a system **consumes LLM output** to make decisions or perform actions.

## Threats to consider

- Prompt injection (content causes the model to ignore instructions)
- Over-trust / tool misuse (model output drives privileged actions)
- Data leakage (secrets/PII included in prompts or outputs)
- Indirect injection via retrieved content (RAG, web pages, PDFs)

## Step-by-step process

1. **Map the AI boundary**
   - Where prompts are built, where tools are called, what data enters/leaves.
2. **Classify outputs**
   - *Advisory*: suggestions for humans
   - *Actionable*: used by code to execute, write files, call APIs, change permissions
3. **Apply controls by class**
   - Advisory: disclaimers, human review, logging with redaction
   - Actionable: strict schema validation, allow-lists, capability gating, step-up approvals
4. **Prompt & retrieval hardening**
   - Separate system instructions from untrusted content
   - Use structured output (JSON schema) and reject invalid outputs
   - Limit context sources; sanitize retrieved content where possible
5. **Add misuse tests**
   - Include injection strings and verify they don’t trigger privileged actions
6. **Document safe usage**
   - Clear rules for what the model may decide vs what code must enforce

## Output

- Boundary diagram (textual is fine)
- Control recommendations (prevent/detect/respond)
- Test cases for injection and over-trust scenarios

## Repo integration (optional)

Related prompt:

- `check-for-unvalidated-genai-acceptances.prompt.md`
