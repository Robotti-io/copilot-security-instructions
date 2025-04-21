# 🔒 Prompt: Access Control & Authorization Review

You are auditing this codebase for **authorization and access control weaknesses**.

Focus on identifying:

- Missing or weak role-based access control (RBAC) or attribute-based access control (ABAC) enforcement
- Direct access to protected routes, actions, or data without permission checks
- Business logic that bypasses access validation (e.g. trusting client-side flags or roles)
- Use of hardcoded role or permission strings without central enforcement
- Functions exposed via APIs that should require authentication but don’t
- Lack of contextual access checks (e.g. ensuring users can only access their own records)

If applicable, recommend use of secure middleware, centralized auth policies, and consistent permission enforcement patterns.

Highlight both missing controls and inconsistently applied ones. Annotate with comments and suggest safer refactors.
