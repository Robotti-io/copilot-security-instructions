// Bad: Hardcoded API key
const API_KEY = "sk_test_abc123XYZsecure";

// Bad: Credentials inline
const dbUser = "admin";
const dbPass = "hunter2";

// Acceptable: Loading from environment variable (but should still validate usage)
const token = process.env.JWT_SECRET;
