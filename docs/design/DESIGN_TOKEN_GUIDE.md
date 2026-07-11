# Design Token Guide

Reference for Bitcraftly Platform design tokens — naming conventions, usage patterns, and examples.

---

## Overview

Design tokens are the single source of truth for visual properties across the platform. They live in `src/styles/` and are consumed via:

1. **CSS custom properties** — direct use in stylesheets (`var(--primary)`)
2. **Tailwind CSS v4 utilities** — mapped via `@theme inline` in `globals.css` (`bg-primary`, `text-foreground`)

### File structure

```
src/styles/
├── tokens.css       # Raw semantic token values (colors, spacing, etc.)
├── typography.css   # Base typographic styles and text utilities
├── animations.css   # Keyframes, motion utilities, reduced-motion
└── globals.css      # Tailwind entry point + @theme mappings
```

Fonts (Geist Sans, Geist Mono) are loaded via `next/font` in `src/app/layout.tsx` and referenced as `--font-geist-sans` / `--font-geist-mono`.

---

## Naming conventions

### Two-layer token model

| Layer | Location | Naming | Example |
|-------|----------|--------|---------|
| **Raw tokens** | `tokens.css` `:root` | Semantic, unprefixed | `--primary`, `--space-4`, `--token-radius-md` |
| **Tailwind theme** | `globals.css` `@theme` | Framework-prefixed | `--color-primary`, `--spacing-4`, `--radius-md` |

Raw tokens describe **what** the value means. Tailwind mappings describe **how** utilities reference them.

### Color naming

Colors use semantic roles, not palette names:

| Pattern | Meaning | Example |
|---------|---------|---------|
| `--{role}` | Base color | `--primary`, `--surface` |
| `--{role}-hover` | Interactive hover state | `--primary-hover` |
| `--{role}-foreground` | Text/icon on `{role}` background | `--primary-foreground` |
| `--{role}-subtle` | Low-emphasis background (feedback colors) | `--success-subtle` |

**Do not** use palette names like `--blue-500` or hardcoded hex in components.

### Spacing naming

Based on an **8px scale**:

| Token | Value | Use |
|-------|-------|-----|
| `--space-0` | 0 | Reset |
| `--space-0-5` | 4px | Fine adjustments |
| `--space-1` | 8px | Tight spacing |
| `--space-2` | 16px | Default inner padding |
| `--space-3` | 24px | Section gaps |
| `--space-4` | 32px | Container padding |
| `--space-6` | 48px | Large gaps |
| `--space-8` | 64px | Section margins |

Tailwind equivalent: `p-2` → 16px, `gap-4` → 32px.

### Radius and shadow

Raw values use `--token-` prefix to avoid circular references in `@theme`:

| Raw token | Tailwind utility |
|-----------|------------------|
| `--token-radius-md` | `rounded-md` |
| `--token-shadow-lg` | `shadow-lg` |

---

## Colors

### Brand and neutral

| Token | Tailwind class | Purpose |
|-------|----------------|---------|
| `--primary` | `bg-primary`, `text-primary` | Primary actions, links |
| `--secondary` | `bg-secondary` | Secondary actions |
| `--accent` | `bg-accent` | Highlights, badges |
| `--background` | `bg-background` | Page background |
| `--foreground` | `text-foreground` | Primary text |
| `--surface` | `bg-surface` | Cards, panels, elevated areas |
| `--border` | `border-border` | Default borders |

### Feedback

| Token | Tailwind class | Purpose |
|-------|----------------|---------|
| `--success` | `bg-success`, `text-success` | Success states |
| `--warning` | `bg-warning` | Warning states |
| `--error` | `bg-error` | Error states |
| `--info` | `bg-info` | Informational states |
| `--{role}-subtle` | `bg-success-subtle` | Low-emphasis feedback backgrounds |

---

## Typography

### Font families

| Token | Tailwind | Usage |
|-------|----------|-------|
| `--font-family-sans` | `font-sans` | Body text, headings, UI |
| `--font-family-mono` | `font-mono` | Code, technical data |

Loaded via `next/font/google` as Geist Sans and Geist Mono.

### Font sizes

| Token | Size | Tailwind | Typical use |
|-------|------|----------|-------------|
| `--font-size-xs` | 12px | `text-xs` | Captions, metadata |
| `--font-size-sm` | 14px | `text-sm` | Labels, secondary text |
| `--font-size-base` | 16px | `text-base` | Body text |
| `--font-size-lg` | 18px | `text-lg` | Lead paragraphs |
| `--font-size-xl` | 20px | `text-xl` | Small headings |
| `--font-size-2xl` | 24px | `text-2xl` | Section headings |
| `--font-size-3xl` | 30px | `text-3xl` | Page headings |
| `--font-size-4xl` | 36px | `text-4xl` | Display text |

### Font weights

| Token | Value | Tailwind |
|-------|-------|----------|
| `--font-weight-normal` | 400 | `font-normal` |
| `--font-weight-medium` | 500 | `font-medium` |
| `--font-weight-semibold` | 600 | `font-semibold` |
| `--font-weight-bold` | 700 | `font-bold` |

### Line heights

| Token | Value | Tailwind |
|-------|-------|----------|
| `--line-height-tight` | 1.25 | `leading-tight` |
| `--line-height-normal` | 1.5 | `leading-normal` |
| `--line-height-relaxed` | 1.625 | `leading-relaxed` |

### Typography CSS classes

Defined in `typography.css` for non-Tailwind contexts:

- `.text-display`, `.text-heading-lg`, `.text-heading-md`, `.text-heading-sm`
- `.text-body-lg`, `.text-body`, `.text-body-sm`
- `.text-caption`, `.text-label`, `.text-mono`, `.text-muted`

---

## Spacing, radius, shadow

### Examples

```html
<!-- 8px padding -->
<div class="p-1">...</div>

<!-- 32px gap with rounded corners and shadow -->
<section class="gap-4 rounded-lg shadow-md">...</section>

<!-- Surface card -->
<article class="bg-surface border border-border rounded-md p-4">...</article>
```

### Direct CSS usage

```css
.custom-panel {
  padding: var(--space-4);
  border-radius: var(--token-radius-md);
  box-shadow: var(--token-shadow-sm);
  background-color: var(--surface);
}
```

---

## Container and breakpoints

### Breakpoints

| Token | Value | Tailwind prefix |
|-------|-------|-----------------|
| `--breakpoint-sm` | 640px | `sm:` |
| `--breakpoint-md` | 768px | `md:` |
| `--breakpoint-lg` | 1024px | `lg:` |
| `--breakpoint-xl` | 1280px | `xl:` |
| `--breakpoint-2xl` | 1536px | `2xl:` |

### Container widths

| Token | Value |
|-------|-------|
| `--container-sm` | 640px |
| `--container-lg` | 1024px |
| `--container-xl` | 1280px |
| `--container-2xl` | 1536px |

### Example

```html
<div class="mx-auto max-w-xl px-4 lg:max-w-4xl">
  <!-- Responsive container -->
</div>
```

---

## Z-index

Use semantic z-index tokens for stacking contexts:

| Token | Value | Use |
|-------|-------|-----|
| `--z-dropdown` | 1000 | Dropdown menus |
| `--z-sticky` | 1100 | Sticky headers |
| `--z-fixed` | 1200 | Fixed elements |
| `--z-modal-backdrop` | 1300 | Modal overlays |
| `--z-modal` | 1400 | Modal content |
| `--z-popover` | 1500 | Popovers |
| `--z-tooltip` | 1600 | Tooltips |

**Do not** use arbitrary z-index values like `z-[9999]`.

---

## Motion

### Durations

| Token | Value | Use |
|-------|-------|-----|
| `--duration-fast` | 150ms | Hover, color transitions |
| `--duration-normal` | 250ms | Fade, slide animations |
| `--duration-slow` | 350ms | Complex transitions |

### Animation classes

Defined in `animations.css`:

- `.animate-fade-in`, `.animate-fade-out`
- `.animate-slide-in-top`, `.animate-slide-in-bottom`
- `.animate-spin`
- `.transition-colors`, `.transition-opacity`, `.transition-transform`

All animations respect `prefers-reduced-motion: reduce`.

---

## Dark mode

Three mechanisms are supported:

1. **`prefers-color-scheme: dark`** — automatic system preference
2. **`.dark` class** — on `<html>` or a parent element
3. **`data-theme="dark"`** — attribute-based toggle

All color tokens swap values in dark mode. No component changes required when toggling themes.

### Future theme toggle

```tsx
// Example — not implemented yet
document.documentElement.classList.toggle("dark");
// or
document.documentElement.setAttribute("data-theme", "dark");
```

---

## Usage rules

1. **Always use tokens** — never hardcode colors, spacing, or shadows in components
2. **Prefer Tailwind utilities** — `bg-primary` over `style={{ background: "..." }}`
3. **Use semantic names** — `text-foreground` not `text-slate-900`
4. **Pair foreground tokens** — use `--primary-foreground` on `--primary` backgrounds
5. **Use feedback subtle variants** — for alert backgrounds, not solid semantic colors

---

## Examples

### Page layout

```html
<body class="min-h-full bg-background text-foreground font-sans">
  <main class="mx-auto max-w-xl p-4">...</main>
</body>
```

### Feedback alert

```html
<div class="rounded-md border border-border bg-success-subtle p-4 text-sm text-success">
  Changes saved successfully.
</div>
```

### Accessible focus

Focus rings are applied globally via `:focus-visible` in `globals.css` using `--primary`.

---

## Related documentation

- [Design README](./README.md)
- [Engineering coding standards](../engineering/coding-standards.md)
- Source: `src/styles/tokens.css`, `src/styles/globals.css`
