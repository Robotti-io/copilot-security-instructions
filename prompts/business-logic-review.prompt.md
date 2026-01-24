# 🧠 Prompt: Business Logic Flow Analysis

You are a senior software engineer performing a **multi-stage review of application behavior and business logic flow**.

---

## ✅ Context / Assumptions

- Start from a fresh read of the current workspace.
- Prefer evidence-first: cite file paths and (when possible) line ranges.
- Do **not** modify files; produce a centralized map and assessment only.
- If scope is unclear, ask up to 3 clarifying questions before finalizing.

## 🔍 Procedure

1. Identify the app’s purpose and primary user journeys.
2. Map “business logic zones” (where important decisions/rules live).
3. Trace key flows from entry point → parsing/validation → business rule → persistence → response.
4. Identify logic risks:
   - bypassable checks, inconsistent enforcement, unsafe assumptions
   - state machine / lifecycle gaps
   - duplicated rules that drift
5. Recommend refactors/tests that reduce security and correctness risk.

## 📦 Output Format

Return Markdown with this structure:

- **App Purpose** (2–3 sentences)
- **Business Logic Zones** (repeat):
  - **Zone**:
  - **Files**:
  - **Decisions made**:
  - **Notes / risks**:
- **Data Flow Narratives** (2–4 flows)
- **Observations & Concerns** (repeat):
  - **Concern**:
  - **Impact**:
  - **Evidence** (file path + snippet/line range if possible)
  - **Suggestion**:
- **Suggested Refactors / Tests** (bullets)

## ✅ Quality checks

- Claims about business rules reference concrete code locations.
- Suggestions are scoped and testable.
- No instructions imply editing files directly inside the output.

---

## ✅ Context Instructions

- Begin with a **fresh, holistic read** of the entire project.
- Ignore any previously cached reviews or analysis history.
- Your job is to understand, map, and critique **how the application works**, especially its **business decision-making**.

---

## 🔍 Step 1: App Purpose + Business Logic Zones

- Describe the overall purpose of the application in 2–3 sentences.
- Identify the main **business logic zones**:
  - Which files/modules implement critical rules, calculations, or policies?
  - Tag areas like pricing logic, access control, account lifecycle, feature gating, compliance handling, etc.
- For each zone, list:
  - File paths
  - A brief description of what decisions are made there

---

## 🔄 Step 2: Data Flow Mapping

- Describe how data flows **from user interaction to backend logic to output**:
  - What are the main entry points? (e.g., web routes, API endpoints)
  - Which layers handle request parsing, validation, routing?
  - Where is business logic applied? When is it bypassed?
  - Where and how is data persisted, transformed, or returned?

If possible, include a **linear narrative or bullet chain** of how a typical request moves through the system.

---

## 🧠 Step 3: Logic Flow Assessment

- Based on the mapping above, evaluate potential concerns:
  - Is any logic duplicated or scattered?
  - Are there business rules implemented in inappropriate layers? (e.g., in views or route handlers)
  - Are any flows brittle, overly coupled, or difficult to reason about?
  - Are user roles, permissions, or state transitions clearly enforced?

Note any areas where logic could be:

- Extracted for clarity
- Consolidated
- Better tested or documented

---

## 📄 Output Format

Generate a Markdown file named `BUSINESS_LOGIC_FLOW.MD` with the following structure:

```markdown
# 🧠 Business Logic Flow Analysis

## ✅ App Purpose
...

## 🧭 Business Logic Zones
- **[Domain Name]**
  - **Files**: ...
  - **Summary**: ...

## 🔄 Data Flow Narrative
- [Example: User submits payment form → API route → billing logic → DB → response]

## 🚩 Flow Observations + Concerns
- **Area**: ...
  - **Concern**: ...
  - **Suggestion**: ...

## 🧠 Suggested Refactors or Tests
- ...
```

---

## ⚠️ Important

Do not modify code or leave inline comments.  
This is a **centralized logic map and assessment**, not a line-by-line code review.

Begin only after fully reading and mapping the project.
