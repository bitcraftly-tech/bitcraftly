# Prompts

AI prompt templates and agent instruction libraries used across the Bitcraftly Platform development workflow.

## Purpose

This directory stores reusable prompts for:

- Cursor and Claude Code agent sessions
- Code review and audit workflows
- Feature scaffolding and implementation guides
- Documentation generation templates
- Consistent AI-assisted development patterns

## Usage guidelines

- Keep prompts focused on a single task or workflow
- Reference engineering standards and architecture docs within prompts
- Version prompts when making significant changes (append date or version in filename)
- Do not include secrets, credentials, or environment-specific values

## Naming convention

```
task-description.md
workflow-name-v1.md
audit-type-YYYY-MM.md
```

## Related resources

- [AGENTS.md](../../AGENTS.md) — Root agent instructions
- [CLAUDE.md](../../CLAUDE.md) — Claude Code entry point
- [.cursor/rules/](../../.cursor/rules/) — Cursor IDE rules

## Related documentation

- [Engineering standards](../engineering/)
- [Architecture](../architecture/)
