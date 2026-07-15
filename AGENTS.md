# Bitcraftly AI Agent

This repository uses project-specific AI instructions to ensure consistent, safe, and maintainable development.

---

# Primary Instructions

Always follow this order:

1. Read `PROJECT_CONTEXT.md`
2. Apply the relevant rules from `.cursor/rules/`
3. Work only within the requested scope
4. Preserve the existing architecture
5. Make the smallest safe change

For architecture-level or multi-file changes, also read:

- `PROJECT_FOUNDATION_REVIEW.md`

---

# Core Rules (Always Apply)

These rules apply to every implementation:

- Bitcraftly-Engineering-Standards.mdc
- Bitcraftly-Architecture-Protection-Rules.mdc
- Bitcraftly-Accessibility-Standards.mdc

---

# Specialized Rules (Apply When Relevant)

Apply only if the current task requires them:

- Bitcraftly-Performance-Standards.mdc
- Bitcraftly-SEO-Standards.mdc
- Bitcraftly-Code-Review.mdc

Do not load specialized rules for unrelated tasks.

---

# Working Principles

Always:

- Modify only the requested files.
- Keep changes focused and minimal.
- Reuse existing components and utilities.
- Preserve backward compatibility whenever possible.
- Follow existing project conventions.
- Keep code production-ready.

Never:

- Modify unrelated files.
- Rewrite large sections without approval.
- Introduce unnecessary dependencies.
- Refactor unrelated code.
- Guess project structure.

---

# Planning

Before making architecture-level or multi-file changes:

1. Explain the implementation plan.
2. Identify affected files.
3. Request confirmation if shared architecture will change.

---

# Definition of Done

A task is complete only when:

- Requirements are fully implemented.
- TypeScript remains strict.
- Accessibility requirements are satisfied.
- Existing architecture is preserved.
- Only requested files are modified.
- No unnecessary complexity has been introduced.