---
name: threat-model-lite
description: Lightweight, repeatable threat modeling for a feature or service with prioritized mitigations.
---

Use this skill when planning a feature, reviewing an architecture, or preparing security requirements.

## Step-by-step process

1. **Define scope**
   - What is being built/changed? What is explicitly out of scope?
2. **Describe the system**
   - Components, identities, data stores, external dependencies
3. **Identify assets**
   - Secrets, PII, money-moving actions, admin capabilities, integrity-critical data
4. **Map trust boundaries**
   - Internet ↔ edge, edge ↔ app, app ↔ data, service ↔ service
5. **List top threats (ranked)**
   - Use STRIDE reasoning; focus on realistic threats
6. **Mitigations**
   - Prevent: validation, authz, rate limiting, encryption
   - Detect: logs, alerts, anomaly detection
   - Respond: rollback, key rotation, incident playbooks
7. **Residual risk**
   - What remains and why; follow-ups

## Output template

- System overview
- Data flows (bulleted)
- Assets
- Trust boundaries
- Top threats + mitigations
- Residual risk + next steps
