---
name: implement-feat
description: Implement a single approved task from a feature document's implementation plan. Scoped execution only; no silent plan expansion.
---

# /implement-feat

## Purpose

Use this skill when the user already has a feature document with an approved implementation plan and wants to execute one task from that plan.

This skill:

- reads the feature document and implementation plan
- identifies the requested task
- implements only that task
- keeps changes tightly scoped
- updates tests as required for that task
- reports what changed, what was validated, and any blockers or deviations

This skill is for **execution of one approved task at a time**.

---

## When to Use

Use this skill when the user asks to:

- implement a specific task from a feature plan
- execute the next approved step in a feature document
- complete one bounded slice of the implementation
- make code changes tied to a named task ID

Good fits:

- “Implement T2 from the feature plan.”
- “Complete the next approved task in this doc.”
- “Build task T4 and update tests.”
- “Execute the first pending task.”

---

## When Not to Use

Do **not** use this skill when the user wants:

- a new implementation plan
- broad feature analysis before planning
- multi-feature execution across unrelated docs
- speculative refactoring
- unbounded “implement the whole feature” behavior without task scope

If the feature does not yet have an implementation plan, use `/plan-feat` first.

---

## Inputs

Expected inputs:

- path to the feature document
- task ID to implement, or a clear instruction like “next approved task”
- access to the repository / workspace

Optional inputs:

- additional constraints
- explicit approval notes
- preferred validation depth

If the task ID is not provided but “next approved task” is requested, infer the next task from the documented task order and status, if available.

---

## Core Rules

1. **Implement one task only**
   - Do not work on multiple tasks unless explicitly instructed.
   - Do not silently pull in later tasks.

2. **Respect the approved plan**
   - The implementation plan is the source of execution scope.
   - If reality contradicts the plan, stop and flag the drift.

3. **Stay tightly scoped**
   - Make the smallest coherent set of changes needed for the selected task.
   - Avoid opportunistic cleanup or unrelated refactors.

4. **Follow project conventions**
   - Use existing code patterns, naming, architecture, and testing style.

5. **Update validation with code**
   - Add or update tests, checks, or validations required by the task.

6. **Stop on material ambiguity**
   - If the task depends on unresolved assumptions, missing prerequisites, or plan errors, stop and report rather than guessing.

7. **Be explicit about deviations**
   - If a small deviation from the plan is necessary, explain it clearly.
   - Do not silently redefine the task.

---

## Workflow

Follow this sequence:

### 1. Read the Feature Document and Plan

Review:

- feature intent
- implementation plan
- task breakdown
- execution order
- dependencies
- open questions / assumptions
- any task status markers if present

Identify the selected task and its exact scope.

### 2. Confirm Task Boundaries

Determine:

- what this task is supposed to accomplish
- what files or modules are likely in scope
- what is explicitly out of scope
- what prerequisites must already be satisfied

If the task depends on unfinished earlier work, stop and report it.

### 3. Inspect Relevant Code

Look at the code directly related to the task:

- implementation points
- adjacent interfaces
- tests
- config
- schema / migration code
- docs if affected

Ground the work in existing project patterns.

### 4. Implement the Task

Make only the changes required to satisfy the selected task’s objective and definition of done.

Keep the implementation:

- minimal
- coherent
- reviewable
- consistent with the codebase

### 5. Add or Update Validation

Update tests or validation steps required for the task, such as:

- unit tests
- integration tests
- API tests
- UI tests
- schema validations
- type checks
- linting or build-related adjustments when needed

Do not claim validation that was not actually performed.

### 6. Update Task Status if Appropriate

If the workflow uses status markers in the feature doc, update the selected task accordingly.

Examples:

- pending → in progress
- in progress → done

Only update status if the task’s definition of done is actually satisfied.

### 7. Summarize Outcome

Provide a concise implementation summary including:

- what changed
- why it changed
- tests or validation performed
- anything that needs review
- any blockers, deviations, or follow-up needed

---

## Scope Controls

Treat the following as out of scope unless explicitly required by the selected task:

- unrelated refactors
- style-only cleanup across unrelated files
- dependency upgrades
- architecture redesign
- renaming campaigns
- fixing nearby unrelated bugs
- implementing future plan tasks

If you encounter a tempting improvement outside scope, note it separately rather than including it in the change.

---

## Drift Handling

Stop and report instead of proceeding when:

- the task is ambiguous
- the codebase reality conflicts with the plan
- a required prerequisite task is unfinished
- the requested task actually spans multiple tasks
- new schema / API / architectural work appears necessary but was not planned
- the feature doc lacks enough detail to safely continue

When reporting drift, include:

- what was expected
- what was found
- why it matters
- the smallest decision needed from the user

---

## Required Response Structure

After implementation, provide a concise summary in this shape:

```markdown
## Task Implementation Summary

### Task
- Task ID:
- Title:

### What Changed
- Concise list of code changes made

### Validation
- Tests added or updated
- Checks performed
- Anything not validated

### Notes for Review
- Important tradeoffs
- Small deviations from plan
- Follow-up considerations

### Status
- Completed / Blocked / Partial

### Blockers (if any)
- What prevented completion
- What decision or prerequisite is needed
```

If the task is blocked, do not pretend partial completion equals success.

---

## Decision Heuristics

When implementing, prefer:

- minimal diffs over broad rewrites
- explicit logic over cleverness
- local consistency over abstract purity
- task completion over incidental optimization
- code the team can maintain over code that merely looks sophisticated

Ask internally:

- Is this change strictly required for the selected task?
- Am I pulling in future work?
- Am I preserving current conventions?
- Did I update validation appropriately?
- Did I encounter uncertainty that should stop execution?

---

## Failure Modes to Avoid

Do not:

- implement the whole feature at once
- broaden scope because adjacent changes seem easy
- ignore the approved plan
- skip tests when the task requires them
- silently change architecture
- mark a task done without satisfying its definition of done
- conceal blockers behind partial implementation language

---

## Completion Check

Before finishing, verify that you:

- implemented only the selected task
- stayed aligned with the approved plan
- kept changes scoped and reviewable
- updated validation appropriately
- updated task status only if warranted
- clearly reported blockers or deviations
- did not silently expand scope
