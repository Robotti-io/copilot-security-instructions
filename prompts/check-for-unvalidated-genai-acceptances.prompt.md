# 🤖 Prompt: Unvalidated GenAI Code Acceptance Audit

You are reviewing code for signs that **AI-generated content** (e.g. from GitHub Copilot, ChatGPT, CodeWhisperer) has been accepted without validation, testing, or verification.

Look for and flag the following:

- Dependencies or packages that do not exist in official registries (possible hallucinated packages)
- Calls to non-existent, deprecated, or undocumented API methods
- Configuration code that does not match the project’s infrastructure (e.g. Azure config in AWS projects)
- Use of placeholder, ambiguous, or overly generic variable/method names (e.g. `doTask()`, `handleThing()`)
- Comments or TODOs referencing AI use without follow-up verification

Also check for:

- Lack of test coverage or validation for recently added logic
- Sudden style or structure shifts that may indicate unreviewed AI insertion
- No accompanying documentation or context for added code

Provide suggestions for verifying third-party resources, validating logic, and encouraging human-in-the-loop code review. Include annotations where risk or uncertainty is high.
