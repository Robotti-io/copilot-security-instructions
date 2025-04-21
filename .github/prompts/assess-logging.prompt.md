# 🕵️ Prompt: Logging & Sensitive Data Exposure Audit

You are reviewing application code for **unsafe logging practices**, **PII exposure**, and **improper log hygiene**.

Identify any of the following issues:

- Logging of sensitive information (e.g. passwords, tokens, API keys, session IDs)
- Unfiltered logs that include full request/response bodies, headers, or user-submitted data
- Logging of stack traces or exceptions without redaction or sanitization
- Console or print statements left in production logic
- Logs that include internal system paths, configurations, or database queries
- Use of insecure transports for logs (e.g. writing logs to public cloud buckets without access control)

Also check for:

- Missing structured log formats (JSON, ECS, etc.)
- Lack of logging levels or misuse of `debug`, `info`, `warn`, `error`

Provide refactor suggestions for redacting or excluding sensitive data. Recommend structured logging libraries or filters, and remind developers to align with least-privilege and data minimization principles.
