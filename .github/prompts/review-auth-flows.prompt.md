# 🧪 Prompt: Authentication Flow Review

You are performing a security review of the application’s **authentication logic and flow handling**.

Look for the following common risks:

- Incomplete or improperly enforced authentication on protected routes or resources
- Weak or non-expiring session tokens (e.g. JWTs with long-lived expirations or missing `exp`)
- Missing or broken CSRF protections (check for missing `SameSite`, CSRF tokens in forms)
- Use of insecure login flows (e.g. no rate limiting, no multi-factor enforcement)
- Tokens or session identifiers exposed via logs, URLs, or frontend JavaScript
- Direct use of user-supplied credentials in downstream API requests without validation

Check for secure practices like:

- Short-lived tokens + refresh workflows
- Server-side session storage with expiration
- Secure cookie flags (`HttpOnly`, `Secure`, `SameSite=Strict`)
- Use of well-tested identity providers or auth frameworks

Recommend mitigations for any insecure implementations you identify.
