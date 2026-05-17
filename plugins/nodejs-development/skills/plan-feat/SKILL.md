---
name: plan-feat
description: Analyze a feature document and the current codebase, then append a concrete implementation plan with small actionable tasks. Planning only; no coding.
---

# /plan-feat

## Purpose

Use this skill when the user has a feature document that describes a feature at a high level and wants an implementation plan before coding begins.

This skill converts intent into an auditable implementation plan by:

- reading the feature document
- analyzing the repository and relevant code paths
- identifying impacted systems and files
- proposing an implementation approach aligned with the existing architecture
- breaking the work into small, sequenced, actionable tasks
- appending the plan back into the feature document

This skill is **planning only**. It must **not** implement code.

---

## When to Use

Use this skill when the user asks to:

- create an implementation plan for a feature
- review a feature doc and determine how to build it
- break a feature into tasks before implementation
- analyze the project and append a plan to the feature doc
- prepare work for plan-driven development

Good fits:

- “Review this feature doc and generate a plan.”
- “Analyze the codebase and add an implementation plan.”
- “Break this feature into small actionable tasks.”
- “Figure out how this should be implemented in this repo.”

---

## When Not to Use

Do **not** use this skill when the user wants:

- direct implementation now
- debugging of an already-started task
- review of completed code changes
- a generic brainstorming session with no feature artifact
- a roadmap across many unrelated features

If the user is asking to build an approved task from an existing plan, use `/implement-feat` instead.

---

## Inputs

Expected inputs:

- path to a feature document
- access to the current repository / workspace
- optionally:
  - constraints
  - preferred architecture direction
  - task size preference
  - known open questions

If some of these are missing, proceed with best-effort analysis and surface assumptions explicitly.

---

## Core Rules

1. **Do not implement code**
   - This skill stops at planning.
   - No code edits, no partial implementation, no opportunistic refactors.

2. **Analyze before proposing**
   - Read the feature document first.
   - Inspect the relevant codebase areas before producing a plan.

3. **Prefer existing patterns**
   - Follow the current architecture, conventions, naming, layering, and testing style.
   - Do not invent new abstractions unless there is a strong codebase-driven reason.

4. **Surface uncertainty**
   - Do not silently guess about project-specific behavior.
   - Capture assumptions and open questions clearly.

5. **Keep tasks small**
   - Tasks should be reviewable, bounded, and meaningfully sequential.
   - Avoid giant “implement everything” tasks.

6. **Plan for validation**
   - Each task should include expected tests, checks, or validation steps.

7. **Include non-code concerns where relevant**
   - Migrations
   - configuration
   - data model changes
   - API contracts
   - UI states
   - performance
   - security
   - backward compatibility
   - rollout concerns
   - documentation updates

8. **Respect conflicts**
   - If the feature doc conflicts with the codebase, note the conflict.
   - Do not force a plan around a contradiction.

---

## Workflow

Follow this sequence:

### 1. Read the Feature Document

Understand:

- the high-level goal
- intended user or system outcome
- stated requirements
- implicit assumptions
- undefined or ambiguous areas

Create a concise internal summary before analyzing the repo.

### 2. Inspect the Relevant Codebase

Review the code paths most likely to be involved, such as:

- existing feature-adjacent modules
- domain models
- services
- controllers / routes / APIs
- UI components
- data access layers
- jobs / workers / queues
- tests
- configuration
- schema / migration layers
- docs if they define existing behavior

Infer how the feature fits the current architecture.

### 3. Identify Implementation Shape

Determine:

- where changes should live
- what layers are affected
- which existing abstractions should be reused
- what sequence of changes makes the work safest
- where validation should happen
- what dependencies or blockers exist

### 4. Create Small Actionable Tasks

Break the work into ordered tasks.

Each task should include:

- Task ID
- Title
- Objective
- Specific changes to make
- Definition of done
- Expected tests / validation

Tasks should be:

- small
- explicit
- scoped
- sequenced
- reviewable

### 5. Capture Risks and Open Questions

Explicitly list:

- assumptions
- unanswered questions
- design tradeoffs
- technical risks
- edge cases
- rollout or compatibility concerns

### 6. Append the Plan to the Feature Document

Append the implementation plan into the feature document under the exact heading:

```markdown
## Implementation Plan
```

If the heading already exists, update or replace the existing implementation plan section instead of duplicating it.

---

## Required Output Structure

Append this structure to the feature document:

```markdown
## Implementation Plan

### 1. Feature Summary
- Concise restatement of the feature and intended outcome

### 2. Relevant Existing Architecture
- Key modules, services, components, data models, APIs, and patterns involved

### 3. Proposed Approach
- Recommended implementation approach
- Why this approach fits the current codebase

### 4. Impacted Areas
- Files, modules, components, routes, schemas, migrations, tests, configs, docs

### 5. Task Breakdown

#### T1: <task title>
- Objective:
- Specific changes:
- Definition of done:
- Expected tests / validation:

#### T2: <task title>
- Objective:
- Specific changes:
- Definition of done:
- Expected tests / validation:

<!-- Continue as needed -->

### 6. Risks and Edge Cases
- Technical risks
- Product / UX edge cases
- Operational concerns
- Backward compatibility concerns

### 7. Open Questions / Assumptions
- Items requiring user confirmation
- Assumptions made from incomplete information

### 8. Suggested Execution Order
1. T1 - reason
2. T2 - reason
3. T3 - reason
```

---

## Task Sizing Guidance

Prefer tasks that represent one meaningful unit of change, such as:

- add or update a domain model
- adjust one service flow
- add one API change
- add one UI integration slice
- add or update one test layer
- perform one migration or config update

Avoid combining multiple unrelated layers into one task unless the repository structure makes separation artificial.

If a task feels large, split it.

---

## Decision Heuristics

When planning, prefer:

- existing abstractions over new frameworks
- minimal viable design changes over speculative redesign
- explicit seams over hidden magic
- codebase consistency over elegance in isolation
- safer sequencing over parallel complexity

Ask internally:

- What is already here that should be reused?
- What is the smallest safe path to shipping this?
- What must be true before later tasks can happen?
- Where is the highest risk concentrated?
- What assumptions am I making that the user should review?

---

## Failure Modes to Avoid

Do not:

- start coding
- generate a vague plan with oversized tasks
- ignore tests
- omit operational or migration concerns when relevant
- assume requirements that are not in the doc or codebase
- produce generic advice detached from the repository
- recommend broad refactors without justification

---

## Completion Check

Before finishing, verify the plan is:

- grounded in the current repository
- aligned with existing architecture
- broken into small tasks
- explicit about assumptions
- reviewable by a human
- appended to the feature document
- planning-only, with no implementation performed
