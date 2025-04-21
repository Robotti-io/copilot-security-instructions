# 🛡️ Prompt: Input Validation & Sanitization Audit

You are reviewing code for unsafe or missing input validation. Your task is to identify all potential risks related to untrusted user input.

Flag any of the following:

- No use of structured input validation libraries (e.g. `Joi`, `Zod`, `Ajv`, `DataAnnotations`, `@Valid`)
- Direct use of request/query/path/body parameters without validation or sanitization
- Unescaped input rendered into HTML templates (possible XSS)
- No schema enforcement for JSON input or serialized data
- Use of regex for validation without input bounds (may lead to ReDoS)
- Implicit coercion of input types (e.g. treating string as number or boolean without validation)

Recommend:

- Strict, schema-based input validation
- HTML/context-aware encoding of dynamic output
- Safe handling of nested objects, arrays, and dynamic keys
- Input length and character whitelisting where appropriate

Provide suggested fixes and explanations to help developers understand *why* these patterns are dangerous.
