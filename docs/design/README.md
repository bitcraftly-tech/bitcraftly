# Design

UI/UX guidelines, design tokens, component specifications, and brand assets for the Bitcraftly Platform.

## Purpose

This directory defines **how the platform looks and feels**. It is the source of truth for:

- Design tokens (colors, typography, spacing, radii, shadows)
- Component specifications and usage guidelines
- Layout patterns and responsive behavior
- Accessibility requirements for visual design
- Brand assets and iconography

## Intended contents

| Document | Description |
|----------|-------------|
| Component specs | [UI_COMPONENT_SPECIFICATION.md](./UI_COMPONENT_SPECIFICATION.md) — primitives API, accessibility, patterns |
| Design tokens | [DESIGN_TOKEN_GUIDE.md](./DESIGN_TOKEN_GUIDE.md) — naming, usage, examples |
| Layout guidelines | Grid, spacing, and breakpoint conventions |
| Brand assets | Logos, icons, and imagery standards |

## Relationship to code

- Design tokens are implemented in `src/styles/` via Tailwind CSS v4 `@theme`
- UI primitives live in `src/components/ui/`
- Feature-specific UI lives within each feature module in `src/features/`

## Related documentation

- [Engineering coding standards](../engineering/coding-standards.md) — Styling rules
- [Architecture](../architecture/) — System structure
