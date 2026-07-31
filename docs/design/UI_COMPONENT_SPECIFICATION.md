# UI Component Specification

**Project:** Bitcraftly Platform  
**Version:** 1.0  
**Status:** Draft — Ready for implementation  
**Author:** Design Systems Engineering  
**Last updated:** 2026-07-11

---

## Document purpose

This specification defines the first layer of reusable UI primitives for the Bitcraftly Platform design system. It is the contract between design tokens (`src/styles/`) and implementation (`src/components/ui/`).

**In scope:** Button, Typography, Container, Section, Stack, Grid  
**Out of scope:** Cards, inputs, navigation, modals, homepage sections, business logic

**Related documents:**

- [DESIGN_TOKEN_GUIDE.md](./DESIGN_TOKEN_GUIDE.md) — token naming and usage
- [Engineering coding standards](../engineering/coding-standards.md) — implementation rules

---

## Design token analysis

All components in this specification **must consume semantic tokens** defined in `src/styles/tokens.css` and mapped through Tailwind CSS v4 `@theme inline` in `globals.css`.

### Token categories used by primitives

| Category        | Key tokens                                                                                                            | Component usage                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Colors**      | `--primary`, `--secondary`, `--accent`, `--background`, `--foreground`, `--surface`, `--border`, `--muted-foreground` | Button variants, Section backgrounds, Typography color                      |
| **Typography**  | `--font-size-*`, `--font-weight-*`, `--line-height-*`, `--font-family-sans`, `--font-family-mono`                     | Typography scale                                                            |
| **Spacing**     | `--space-0` through `--space-16` (8px scale)                                                                          | Button padding, Stack/Grid gaps, Section vertical rhythm, Container padding |
| **Radius**      | `--token-radius-md` (default interactive radius)                                                                      | Button corners                                                              |
| **Shadow**      | `--token-shadow-*`                                                                                                    | Not used in v1 primitives (reserved for elevated components)                |
| **Container**   | `--container-sm` through `--container-2xl`, `--container-padding`                                                     | Container max-width                                                         |
| **Breakpoints** | `--breakpoint-sm` (640px) through `--breakpoint-2xl` (1536px)                                                         | Grid responsive columns, Container behavior                                 |
| **Motion**      | `--duration-fast`, `--ease-default`                                                                                   | Button hover/focus transitions                                              |
| **Focus**       | `--primary` (global `:focus-visible` ring)                                                                            | Button keyboard focus                                                       |

### Token rules for all components

1. Use Tailwind semantic utilities (`bg-primary`, `text-foreground`, `gap-4`) — not raw palette names (`bg-blue-600`)
2. Never hardcode hex, rgb, or pixel values in component implementations
3. Pair background tokens with matching `-foreground` tokens
4. Respect dark mode — tokens swap automatically via `prefers-color-scheme`, `.dark`, or `data-theme="dark"`
5. Motion must honor `prefers-reduced-motion: reduce`

---

## System architecture

### Layer model

```
Design Tokens (src/styles/)
        ↓
UI Primitives (src/components/ui/)     ← this specification
        ↓
Feature Components (src/features/*/)
        ↓
Pages / Routes (src/app/)
```

### Component classification

| Component                                  | RSC / Client | Rationale                                           |
| ------------------------------------------ | ------------ | --------------------------------------------------- |
| Button                                     | **Client**   | Interactive; requires event handling, loading state |
| Typography (Heading, Text, Label, Caption) | **Server**   | Presentational; no client-side state                |
| Container                                  | **Server**   | Layout wrapper                                      |
| Section                                    | **Server**   | Layout wrapper                                      |
| Stack                                      | **Server**   | Layout helper                                       |
| Grid                                       | **Server**   | Layout helper                                       |

---

## Folder recommendations

```
src/components/ui/
├── index.ts                    # Root barrel export
├── button/
│   ├── Button.tsx              # Component implementation
│   ├── button.types.ts         # Props and variant types
│   └── index.ts                # Folder barrel export
├── typography/
│   ├── Heading.tsx
│   ├── Text.tsx
│   ├── Label.tsx
│   ├── Caption.tsx
│   ├── typography.types.ts
│   └── index.ts
├── container/
│   ├── Container.tsx
│   ├── container.types.ts
│   └── index.ts
├── section/
│   ├── Section.tsx
│   ├── section.types.ts
│   └── index.ts
├── stack/
│   ├── Stack.tsx
│   ├── stack.types.ts
│   └── index.ts
└── grid/
    ├── Grid.tsx
    ├── grid.types.ts
    └── index.ts

src/lib/
└── cn.ts                       # Class name composition utility
```

### Folder rules

| Rule                            | Detail                                                                        |
| ------------------------------- | ----------------------------------------------------------------------------- |
| One folder per component family | `button/`, not `Button/`                                                      |
| PascalCase component files      | `Button.tsx`, `Heading.tsx`                                                   |
| kebab-case type files           | `button.types.ts`                                                             |
| Barrel export per folder        | `index.ts` re-exports public API                                              |
| Root barrel                     | `src/components/ui/index.ts` exports all primitives                           |
| No cross-folder imports         | Components import from `@/lib/cn` and tokens only — not from other UI folders |
| Types colocated                 | Props interfaces live in `{component}.types.ts`                               |

---

## Naming conventions

| Element               | Convention                         | Example                                    |
| --------------------- | ---------------------------------- | ------------------------------------------ |
| Component             | PascalCase noun                    | `Button`, `Heading`, `Container`           |
| Props interface       | `{Component}Props`                 | `ButtonProps`, `GridProps`                 |
| Variant type          | `{Component}Variant`               | `ButtonVariant`                            |
| Size type             | `{Component}Size`                  | `ButtonSize`, `ContainerSize`              |
| Variant values        | lowercase kebab or single word     | `"primary"`, `"outline"`, `"ghost"`        |
| Boolean props         | `is` / `has` prefix where semantic | `loading`, `disabled`, `required`, `muted` |
| Polymorphic `as` prop | HTML element union type            | `as?: "div" \| "section" \| "main"`        |
| Default export        | Avoid — use named exports          | `export { Button }`                        |

---

## Implementation order

Build primitives in dependency order. Each phase should pass `typecheck`, `lint`, and `build` before proceeding.

| Phase | Components                                 | Rationale                                                      |
| ----- | ------------------------------------------ | -------------------------------------------------------------- |
| **1** | `cn` utility                               | Shared by all components                                       |
| **2** | Typography (Heading, Text, Label, Caption) | Zero dependencies; used by all features                        |
| **3** | Container                                  | Foundational layout wrapper                                    |
| **4** | Stack, Grid                                | Layout composition helpers                                     |
| **5** | Section                                    | Composes Container + spacing patterns                          |
| **6** | Button                                     | Interactive primitive; depends on typography for loading label |

---

# Component specifications

---

## 1. Button

### Purpose

Triggers actions and events. The primary interactive primitive for forms, dialogs, and calls-to-action. Must be accessible, keyboard-operable, and visually distinct across emphasis levels.

### Variants

| Variant     | Visual intent           | Token mapping                                                            |
| ----------- | ----------------------- | ------------------------------------------------------------------------ |
| `primary`   | Main call-to-action     | `bg-primary`, `text-primary-foreground`, hover: `bg-primary-hover`       |
| `secondary` | Supporting action       | `bg-secondary`, `text-secondary-foreground`, hover: `bg-secondary-hover` |
| `outline`   | Tertiary / low emphasis | `border-border`, `text-foreground`, hover: `bg-surface`                  |
| `ghost`     | Minimal / inline action | transparent, `text-foreground`, hover: `bg-surface`                      |

**Default:** `primary`

### Sizes

| Size | Height                        | Horizontal padding | Font size token    | Gap (icon + label) |
| ---- | ----------------------------- | ------------------ | ------------------ | ------------------ |
| `sm` | 32px (`--space-4` equivalent) | `--space-3` (24px) | `--font-size-sm`   | 6px                |
| `md` | 40px                          | `--space-4` (32px) | `--font-size-base` | 8px                |
| `lg` | 48px                          | `--space-6` (48px) | `--font-size-lg`   | 10px               |

**Default:** `md`

Shared across all sizes:

- Border radius: `--token-radius-md`
- Font weight: `--font-weight-medium`
- Transition: `--duration-fast` with `--ease-default`

### Props

| Prop        | Type                                               | Default     | Required | Description                                          |
| ----------- | -------------------------------------------------- | ----------- | -------- | ---------------------------------------------------- |
| `variant`   | `"primary" \| "secondary" \| "outline" \| "ghost"` | `"primary"` | No       | Visual emphasis                                      |
| `size`      | `"sm" \| "md" \| "lg"`                             | `"md"`      | No       | Dimensions                                           |
| `loading`   | `boolean`                                          | `false`     | No       | Shows spinner; disables interaction                  |
| `disabled`  | `boolean`                                          | `false`     | No       | Prevents interaction                                 |
| `type`      | `"button" \| "submit" \| "reset"`                  | `"button"`  | No       | Native button type                                   |
| `children`  | `ReactNode`                                        | —           | Yes      | Button label                                         |
| `className` | `string`                                           | —           | No       | Additional classes                                   |
| `...rest`   | `ButtonHTMLAttributes`                             | —           | No       | Native button attributes (`aria-*`, `onClick`, etc.) |

### States

| State             | Behavior             | Visual                                                                          |
| ----------------- | -------------------- | ------------------------------------------------------------------------------- |
| **Default**       | Interactive          | Variant colors applied                                                          |
| **Hover**         | Pointer devices only | `-hover` token for filled variants; `bg-surface` for outline/ghost              |
| **Focus-visible** | Keyboard navigation  | 2px ring using `--primary`, 2px offset from `--background`                      |
| **Active**        | Mouse/touch press    | Inherits hover (no separate token in v1)                                        |
| **Disabled**      | Non-interactive      | 50% opacity, `pointer-events-none`, native `disabled` attribute                 |
| **Loading**       | Non-interactive      | Spinner visible, `aria-busy="true"`, `disabled` enforced, label remains visible |

### Accessibility

| Requirement    | Implementation                                                                               |
| -------------- | -------------------------------------------------------------------------------------------- |
| Native element | Always render `<button>`, never `<div role="button">`                                        |
| Disabled state | Use native `disabled` attribute                                                              |
| Loading state  | Set `aria-busy="true"`; include visually hidden "Loading" text for screen readers            |
| Spinner        | Mark decorative spinner `aria-hidden="true"`                                                 |
| Focus          | Visible focus ring on `:focus-visible` only (not on mouse click)                             |
| Contrast       | `primary-foreground` on `primary` must meet WCAG AA (4.5:1) — verified in token design       |
| Label          | Button text must be descriptive; do not rely on icon alone without `aria-label`              |
| Submit         | Use `type="submit"` explicitly in forms; default is `"button"` to prevent accidental submits |

### Responsive behavior

Buttons do not change size or variant at breakpoints by default. Consumers may override via `className`. Avoid different variant/size per breakpoint within the component — handle at composition level.

### Examples (usage intent)

| Scenario             | Configuration                                                                     |
| -------------------- | --------------------------------------------------------------------------------- |
| Form submit          | `variant="primary"`, `type="submit"`                                              |
| Cancel action        | `variant="outline"`                                                               |
| Destructive (future) | Not in v1 — use `outline` with error context until `destructive` variant is added |
| Toolbar action       | `variant="ghost"`, `size="sm"`                                                    |
| Async action         | `loading={true}` while request is in flight                                       |

### Best practices

- One primary button per visible section
- Use `outline` or `ghost` for secondary actions
- Always provide text content or `aria-label`
- Set `loading` instead of manually disabling during async operations
- Use `type="button"` for non-submit actions inside forms

### Anti-patterns

- Using `<a>` styled as a button for navigation — use link component (future)
- Multiple primary buttons in the same visual group
- Disabling buttons without explanation when not loading
- Hardcoding colors (`bg-blue-600`) instead of token utilities
- Using `onClick` on non-interactive elements instead of Button
- Icon-only buttons without accessible name

### Future extensibility

| Extension                     | Notes                                           |
| ----------------------------- | ----------------------------------------------- |
| `destructive` variant         | Maps to `--error` / `--error-foreground` tokens |
| `icon` / `iconPosition` props | Leading or trailing icon slot                   |
| `fullWidth` prop              | `w-full` for form layouts                       |
| `asChild` pattern             | Radix-style composition with links              |
| `accent` variant              | Maps to `--accent` tokens for promotional CTAs  |

---

## 2. Typography

Typography is a **component family** with four sub-components: `Heading`, `Text`, `Label`, and `Caption`.

### Purpose

Provides consistent, semantic, accessible text rendering across the platform. Separates visual scale from semantic HTML where necessary (e.g., styled `h2` that renders as `h3` for document outline).

---

### 2a. Heading

#### Purpose

Page and section titles. Maps visual hierarchy to semantic heading levels.

#### Variants

No color variants in v1. Always renders `text-foreground`.

| Level | Element default | Font size          | Weight                   | Line height            |
| ----- | --------------- | ------------------ | ------------------------ | ---------------------- |
| 1     | `h1`            | `--font-size-4xl`  | `--font-weight-bold`     | `--line-height-tight`  |
| 2     | `h2`            | `--font-size-3xl`  | `--font-weight-semibold` | `--line-height-tight`  |
| 3     | `h3`            | `--font-size-2xl`  | `--font-weight-semibold` | `--line-height-snug`   |
| 4     | `h4`            | `--font-size-xl`   | `--font-weight-semibold` | `--line-height-snug`   |
| 5     | `h5`            | `--font-size-lg`   | `--font-weight-medium`   | `--line-height-normal` |
| 6     | `h6`            | `--font-size-base` | `--font-weight-medium`   | `--line-height-normal` |

**Default level:** 2

#### Sizes

Heading uses `level` (1–6) instead of a separate size prop. Visual scale is tied to semantic level by default.

#### Props

| Prop        | Type                                           | Default              | Description           |
| ----------- | ---------------------------------------------- | -------------------- | --------------------- |
| `as`        | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | Derived from `level` | HTML element rendered |
| `level`     | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                   | `2`                  | Visual scale          |
| `children`  | `ReactNode`                                    | —                    | Heading content       |
| `className` | `string`                                       | —                    | Additional classes    |

When `as` and `level` differ, `level` controls visual scale; `as` controls semantics (for accessible document outline).

#### Accessibility

- Must render native heading elements (`h1`–`h6`)
- Do not skip heading levels in page composition
- One `h1` per page
- Use `text-balance` for improved multi-line heading readability

---

### 2b. Text

#### Purpose

Body copy, descriptions, and paragraph content.

#### Variants

| Variant | Description                                         |
| ------- | --------------------------------------------------- |
| Default | `text-foreground`                                   |
| `muted` | `text-muted-foreground` — secondary/supporting copy |

#### Sizes

| Size   | Font size token    | Line height             |
| ------ | ------------------ | ----------------------- |
| `sm`   | `--font-size-sm`   | `--line-height-normal`  |
| `base` | `--font-size-base` | `--line-height-normal`  |
| `lg`   | `--font-size-lg`   | `--line-height-relaxed` |

**Default:** `base`

#### Props

| Prop        | Type                     | Default  | Description        |
| ----------- | ------------------------ | -------- | ------------------ |
| `size`      | `"sm" \| "base" \| "lg"` | `"base"` | Text scale         |
| `muted`     | `boolean`                | `false`  | Secondary color    |
| `children`  | `ReactNode`              | —        | Text content       |
| `className` | `string`                 | —        | Additional classes |

#### Accessibility

- Renders `<p>` by default — use for block text
- Do not use Text for labels — use `Label`
- Maintain `--foreground` on `--background` contrast (16:1 light, 19:1 dark)

---

### 2c. Label

#### Purpose

Accessible labels for form controls and interactive elements.

#### Variants

Single visual style in v1.

| Property           | Token                  |
| ------------------ | ---------------------- |
| Font size          | `--font-size-sm`       |
| Weight             | `--font-weight-medium` |
| Color              | `--foreground`         |
| Required indicator | `--error` (asterisk)   |

#### Props

| Prop        | Type        | Default | Description                        |
| ----------- | ----------- | ------- | ---------------------------------- |
| `htmlFor`   | `string`    | —       | Associates label with control `id` |
| `required`  | `boolean`   | `false` | Shows required indicator           |
| `children`  | `ReactNode` | —       | Label text                         |
| `className` | `string`    | —       | Additional classes                 |

#### Accessibility

- Always render native `<label>`
- Always provide `htmlFor` when labeling an input (future Input component)
- Required fields: visual `*` with `aria-hidden="true"` plus screen-reader-only "(required)" text
- Do not rely on placeholder text instead of labels

---

### 2d. Caption

#### Purpose

Supplementary metadata, timestamps, helper descriptions, and fine print.

#### Variants

Single style: `--font-size-xs`, `--muted-foreground`.

#### Props

| Prop        | Type        | Default | Description        |
| ----------- | ----------- | ------- | ------------------ |
| `children`  | `ReactNode` | —       | Caption content    |
| `className` | `string`    | —       | Additional classes |

#### Accessibility

- Renders `<span>` — use adjacent to labeled content, not as sole descriptor for inputs
- Ensure caption text meets contrast on parent background (muted-foreground verified in tokens)

---

### Typography — shared best practices

- Use `Heading` for titles, `Text` for paragraphs, `Label` for form fields, `Caption` for metadata
- Never override font family — Geist Sans is the platform default
- Use `font-mono` (Geist Mono) only for code blocks and technical values (future `Code` component)
- Prefer semantic elements over styled `<div>` text

### Typography — anti-patterns

- Using heading levels for visual sizing without semantic meaning (fix with `as`/`level` split)
- Nesting headings inside headings
- Using `Text` with manual `<strong>` tags instead of proper heading hierarchy
- Hardcoded font sizes (`text-[18px]`)

### Typography — future extensibility

| Extension                | Notes                                               |
| ------------------------ | --------------------------------------------------- |
| `Code` / `Kbd`           | Monospace sub-components using `--font-family-mono` |
| `Truncate` / `lineClamp` | Text overflow utilities                             |
| `color` prop on Text     | `"success"`, `"error"` for inline feedback          |
| `polymorphic as` on Text | Render as `span` for inline use                     |

---

## 3. Container

### Purpose

Constrains content width and provides consistent horizontal padding. Centers content within the viewport and aligns with the platform grid system.

### Variants

Container uses **size** instead of visual variant.

| Size   | Max width token   | Value      |
| ------ | ----------------- | ---------- |
| `sm`   | `--container-sm`  | 640px      |
| `md`   | `--container-md`  | 768px      |
| `lg`   | `--container-lg`  | 1024px     |
| `xl`   | `--container-xl`  | 1280px     |
| `2xl`  | `--container-2xl` | 1536px     |
| `full` | none              | 100% width |

**Default:** `xl`

### Sizes

See variant table above. Size determines max-width only; padding is constant.

Horizontal padding: `--container-padding` (`--space-4` / 32px) on all sizes.

### Props

| Prop        | Type                                              | Default | Description          |
| ----------- | ------------------------------------------------- | ------- | -------------------- |
| `size`      | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full"` | `"xl"`  | Max width constraint |
| `as`        | `"div" \| "section" \| "main" \| "article"`       | `"div"` | HTML element         |
| `children`  | `ReactNode`                                       | —       | Content              |
| `className` | `string`                                          | —       | Additional classes   |

### States

Container is non-interactive. No hover, focus, or disabled states.

### Accessibility

- Use `as="main"` for primary page content (one per page)
- Use `as="article"` for self-contained content
- Do not use Container as a substitute for landmark regions — choose `as` semantically

### Responsive behavior

- Full width below max-width threshold; centered with `mx-auto`
- Horizontal padding prevents edge-to-edge content on narrow viewports
- Container does not change size at breakpoints automatically — consumer selects size or overrides via `className`

### Examples

| Scenario               | Configuration               |
| ---------------------- | --------------------------- |
| Marketing page content | `size="xl"`                 |
| Dashboard data table   | `size="2xl"` or `full`      |
| Narrow form            | `size="sm"`                 |
| Blog article           | `size="lg"`, `as="article"` |

### Best practices

- Nest Container inside Section, not vice versa
- Use consistent size within a feature for visual alignment
- Prefer `xl` as the platform default

### Anti-patterns

- Nesting Containers unnecessarily
- Using arbitrary max-width values instead of container tokens
- Setting horizontal padding manually on child elements instead of relying on Container

### Future extensibility

| Extension              | Notes                                            |
| ---------------------- | ------------------------------------------------ |
| Responsive `size` prop | `{ base: "full", lg: "xl" }`                     |
| `fluid` mode           | Max-width with percentage-based padding          |
| `centered={false}`     | For full-bleed layouts within constrained parent |

---

## 4. Section

### Purpose

Defines vertical page regions with consistent spacing and optional background treatment. Separates content blocks (hero, features, footer areas) without prescribing internal layout.

### Variants (background)

| Background | Token mapping                           | Use                         |
| ---------- | --------------------------------------- | --------------------------- |
| `default`  | `bg-background`, `text-foreground`      | Standard page sections      |
| `surface`  | `bg-surface`, `text-surface-foreground` | Elevated/alternating bands  |
| `muted`    | `bg-surface`, `text-muted-foreground`   | De-emphasized sections      |
| `none`     | transparent                             | Layout-only spacing wrapper |

**Default:** `default`

### Sizes (spacing)

Controls vertical padding (top and bottom).

| Spacing | Token        | Value |
| ------- | ------------ | ----- |
| `sm`    | `--space-4`  | 32px  |
| `md`    | `--space-6`  | 48px  |
| `lg`    | `--space-8`  | 64px  |
| `xl`    | `--space-12` | 96px  |

**Default:** `lg`

### Props

| Prop         | Type                                          | Default     | Description          |
| ------------ | --------------------------------------------- | ----------- | -------------------- |
| `background` | `"default" \| "surface" \| "muted" \| "none"` | `"default"` | Background treatment |
| `spacing`    | `"sm" \| "md" \| "lg" \| "xl"`                | `"lg"`      | Vertical padding     |
| `as`         | `"section" \| "div"`                          | `"section"` | HTML element         |
| `children`   | `ReactNode`                                   | —           | Section content      |
| `className`  | `string`                                      | —           | Additional classes   |

### States

Non-interactive. No states.

### Accessibility

- Default `as="section"` provides landmark semantics
- Add `aria-labelledby` referencing a section Heading when the section has a title
- Do not use Section as a clickable region
- Alternating `surface` backgrounds help visual separation but must maintain text contrast

### Responsive behavior

- Vertical spacing is fixed per `spacing` prop — does not auto-adjust at breakpoints in v1
- Consumers may increase spacing at larger viewports via `className` (e.g., `md:py-16`)

### Examples

| Scenario             | Configuration                          |
| -------------------- | -------------------------------------- |
| Hero area            | `spacing="xl"`, `background="default"` |
| Feature band         | `background="surface"`, `spacing="lg"` |
| Footer               | `background="muted"`, `spacing="md"`   |
| Spacing-only wrapper | `background="none"`, `spacing="sm"`    |

### Best practices

- Compose: `Section` → `Container` → content
- Alternate `default` and `surface` backgrounds for visual rhythm
- Match spacing to content density — dense dashboards use `sm`, marketing uses `lg` or `xl`

### Anti-patterns

- Using Section for card-level grouping (future Card component)
- Applying horizontal padding on Section (Container handles horizontal inset)
- Hardcoded background colors

### Future extensibility

| Extension                       | Notes                                                |
| ------------------------------- | ---------------------------------------------------- |
| `id` prop for anchor navigation | Table of contents, in-page links                     |
| Responsive `spacing`            | `{ base: "md", lg: "xl" }`                           |
| `borderTop` / `borderBottom`    | Section dividers using `--border`                    |
| `fullBleed`                     | Break out of parent Container for edge-to-edge media |

---

## 5. Stack

### Purpose

Arranges children vertically with consistent gap spacing. The default layout helper for forms, lists, and content groups.

### Variants

No visual variants. Layout-only.

### Sizes (spacing)

Maps to the 8px spacing scale via Tailwind `gap-*` utilities.

| Spacing | Token       | Value |
| ------- | ----------- | ----- |
| `0`     | `--space-0` | 0     |
| `1`     | `--space-1` | 8px   |
| `2`     | `--space-2` | 16px  |
| `3`     | `--space-3` | 24px  |
| `4`     | `--space-4` | 32px  |
| `6`     | `--space-6` | 48px  |
| `8`     | `--space-8` | 64px  |

**Default:** `4` (32px)

### Props

| Prop        | Type                                            | Default     | Description          |
| ----------- | ----------------------------------------------- | ----------- | -------------------- |
| `spacing`   | `"0" \| "1" \| "2" \| "3" \| "4" \| "6" \| "8"` | `"4"`       | Gap between children |
| `align`     | `"start" \| "center" \| "end" \| "stretch"`     | `"stretch"` | Cross-axis alignment |
| `as`        | `"div" \| "section" \| "ul" \| "ol" \| "nav"`   | `"div"`     | HTML element         |
| `children`  | `ReactNode`                                     | —           | Stack items          |
| `className` | `string`                                        | —           | Additional classes   |

### States

Non-interactive.

### Accessibility

- Use `as="ul"` or `as="ol"` with `<li>` children for semantic lists
- Use `as="nav"` for navigation groups (with appropriate child markup)
- Do not use Stack when semantic list structure is required but children are not `<li>` elements

### Responsive behavior

- Gap is fixed per `spacing` prop in v1
- Consumers override with responsive gap classes via `className` if needed

### Examples

| Scenario               | Configuration             |
| ---------------------- | ------------------------- |
| Form fields            | `spacing="4"`, `as="div"` |
| Navigation links       | `spacing="2"`, `as="nav"` |
| Tight metadata list    | `spacing="1"`             |
| Page sections (nested) | `spacing="8"`             |

### Best practices

- Prefer Stack over manual margin on children
- Use `align="center"` for horizontally centered icon + text groups
- Use `align="start"` for left-aligned form layouts

### Anti-patterns

- Adding margin to individual children instead of using `spacing`
- Using Stack for horizontal layout (use Grid or future HStack)
- Nesting Stacks with identical spacing (flatten where possible)

### Future extensibility

| Extension                | Notes                                   |
| ------------------------ | --------------------------------------- |
| `direction="horizontal"` | Renamed or aliased as `HStack`          |
| Responsive `spacing`     | `{ base: "2", md: "4" }`                |
| `divider` prop           | Visual separators between items         |
| `wrap`                   | Allow items to wrap on narrow viewports |

---

## 6. Grid

### Purpose

Arranges children in a responsive CSS grid. Used for card layouts, feature grids, dashboard widgets, and multi-column content.

### Variants

No visual variants. Layout-only.

### Sizes

**Gap** (same scale as Stack):

| Gap     | Token       | Value     |
| ------- | ----------- | --------- |
| `0`–`8` | `--space-*` | 8px scale |

**Default gap:** `4` (32px)

**Columns:**

| Prop   | Type                          | Default | Description                           |
| ------ | ----------------------------- | ------- | ------------------------------------- |
| `cols` | `1 \| 2 \| 3 \| 4 \| 6 \| 12` | `1`     | Base column count                     |
| `sm`   | `1 \| 2 \| 3 \| 4 \| 6 \| 12` | —       | Columns at `--breakpoint-sm` (640px)  |
| `md`   | `1 \| 2 \| 3 \| 4 \| 6 \| 12` | —       | Columns at `--breakpoint-md` (768px)  |
| `lg`   | `1 \| 2 \| 3 \| 4 \| 6 \| 12` | —       | Columns at `--breakpoint-lg` (1024px) |
| `xl`   | `1 \| 2 \| 3 \| 4 \| 6 \| 12` | —       | Columns at `--breakpoint-xl` (1280px) |

### Props

| Prop                   | Type                                            | Default | Description          |
| ---------------------- | ----------------------------------------------- | ------- | -------------------- |
| `cols`                 | `1 \| 2 \| 3 \| 4 \| 6 \| 12`                   | `1`     | Default columns      |
| `sm`, `md`, `lg`, `xl` | column union                                    | —       | Responsive overrides |
| `gap`                  | `"0" \| "1" \| "2" \| "3" \| "4" \| "6" \| "8"` | `"4"`   | Grid gap             |
| `as`                   | `"div" \| "section" \| "ul" \| "ol"`            | `"div"` | HTML element         |
| `children`             | `ReactNode`                                     | —       | Grid items           |
| `className`            | `string`                                        | —       | Additional classes   |

### States

Non-interactive.

### Accessibility

- Grid is presentational — ensure reading order matches visual order
- Use `as="ul"` with `<li>` children for content that is semantically a list
- Do not use column count alone to imply relationships — use headings and landmarks

### Responsive behavior

Mobile-first column progression:

```
cols=1  →  md=2  →  lg=3  →  xl=4
```

Common pattern for feature grids:

| Breakpoint     | Columns |
| -------------- | ------- |
| Base (< 640px) | 1       |
| `md` (768px)   | 2       |
| `lg` (1024px)  | 3       |

Each responsive prop applies at its breakpoint and above (cascade).

### Examples

| Scenario          | Configuration                                             |
| ----------------- | --------------------------------------------------------- |
| Feature cards     | `cols={1}`, `md={2}`, `lg={3}`, `gap="4"`                 |
| Dashboard widgets | `cols={1}`, `md={2}`, `xl={4}`, `gap="4"`                 |
| Sidebar layout    | Use Grid at page level; not inside Container without care |
| Photo gallery     | `cols={2}`, `md={3}`, `lg={4}`, `gap="2"`                 |

### Best practices

- Start with `cols={1}` for mobile-first design
- Use consistent gap within a page section
- Limit column count to content needs — 3–4 max for readability
- Combine with Container and Section for page-level structure

### Anti-patterns

- Using Grid for single-axis vertical layout (use Stack)
- More than 12 columns
- Inconsistent gaps within the same visual group
- Relying on grid placement for semantic structure

### Future extensibility

| Extension                     | Notes                                                                    |
| ----------------------------- | ------------------------------------------------------------------------ |
| `rows` prop                   | Explicit row count                                                       |
| `autoFit` / `minChildWidth`   | Auto-responsive columns (`grid-template-columns: repeat(auto-fit, ...)`) |
| `colSpan` on child            | Column spanning for featured items                                       |
| `alignItems` / `justifyItems` | Grid alignment control                                                   |

---

## Composition patterns

Recommended page structure using all six primitives:

```
Section (background, spacing)
  └── Container (size)
        └── Stack (spacing)           ← vertical page flow
              ├── Heading (level=1)
              ├── Text (muted)
              └── Grid (cols, md, lg)  ← feature items
                    ├── item
                    ├── item
                    └── item
```

Form action pattern:

```
Stack (spacing="4")
  ├── Label (htmlFor, required)
  ├── [Input — future]
  └── Stack (spacing="2", direction horizontal — future HStack)
        ├── Button (primary, type="submit")
        └── Button (outline, type="button")
```

---

## Component API summary

| Component     | Key props                                                    | Client? |
| ------------- | ------------------------------------------------------------ | ------- |
| **Button**    | `variant`, `size`, `loading`, `disabled`, `type`, `children` | Yes     |
| **Heading**   | `as`, `level`, `children`                                    | No      |
| **Text**      | `size`, `muted`, `children`                                  | No      |
| **Label**     | `htmlFor`, `required`, `children`                            | No      |
| **Caption**   | `children`                                                   | No      |
| **Container** | `size`, `as`, `children`                                     | No      |
| **Section**   | `background`, `spacing`, `as`, `children`                    | No      |
| **Stack**     | `spacing`, `align`, `as`, `children`                         | No      |
| **Grid**      | `cols`, `sm`, `md`, `lg`, `xl`, `gap`, `as`, `children`      | No      |

### Import convention

```
@/components/ui              → all primitives
@/components/ui/button       → Button only
@/components/ui/typography   → Heading, Text, Label, Caption
```

---

## Quality checklist (pre-merge)

Before any primitive is merged, verify:

- [ ] All colors use semantic token utilities
- [ ] No hardcoded hex, rgb, or pixel values
- [ ] Props are fully typed in `{component}.types.ts`
- [ ] Barrel exports expose public API only
- [ ] Server vs Client classification is correct
- [ ] Accessibility requirements met (see per-component sections)
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Component documented in this specification if API changed

---

## Version history

| Version | Date       | Changes                                     |
| ------- | ---------- | ------------------------------------------- |
| 1.0     | 2026-07-11 | Initial specification for six UI primitives |

---

## Related documentation

- [DESIGN_TOKEN_GUIDE.md](./DESIGN_TOKEN_GUIDE.md)
- [Design README](./README.md)
- [Engineering coding standards](../engineering/coding-standards.md)
