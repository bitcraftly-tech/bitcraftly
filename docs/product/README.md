# Product

Product specifications, requirements, and feature documentation for the Bitcraftly Platform.

## Purpose

This directory captures **what we are building and why**. It bridges product intent and engineering implementation.

Use this directory for:

- Feature specifications and acceptance criteria
- User stories and use cases
- Product roadmap details per feature domain
- Release notes and changelog drafts
- Stakeholder-facing requirement documents

## Feature domains

The platform is organized around these product domains:

| Domain | Directory | Description |
|--------|-----------|-------------|
| Homepage | `src/features/homepage/` | Public-facing landing and marketing |
| Work / Portfolio | [`work-portfolio-spec.md`](./work-portfolio-spec.md) · `src/features/work/` | Portfolio landing, filters, project detail |
| Authentication | `src/features/auth/` | Login, registration, session management |
| Dashboard | `src/features/dashboard/` | Authenticated user workspace |
| CRM | `src/features/crm/` | Customer relationship management |
| CMS | `src/features/cms/` | Content management |
| AI | `src/features/ai/` | AI-powered features and integrations |

## Specs

| Document | Description |
|----------|-------------|
| [work-portfolio-spec.md](./work-portfolio-spec.md) | Work / Portfolio product specification (hero, filters, cards, detail, SEO, CTA) |

## Document format

When adding product specs, use descriptive filenames:

```
feature-name-spec.md
feature-name-user-stories.md
release-vX.Y-notes.md
```

## Related documentation

- [Architecture](../architecture/) — Technical structure
- [Design](../design/) — UI/UX guidelines
- [Engineering](../engineering/) — Implementation standards
