# Engineering Coding Standards

Standards for writing code in the Bitcraftly Platform. All contributors — human and AI — must follow these conventions.

---

## Naming Conventions

### Files and directories

| Type | Convention | Example |
|------|------------|---------|
| React components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Services | camelCase with descriptive suffix | `authService.ts` |
| Types | PascalCase | `User.ts`, `AuthResponse.ts` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
| Feature folders | kebab-case or lowercase | `auth/`, `dashboard/` |
| Route segments | kebab-case | `src/app/(platform)/user-settings/` |

### Variables and functions

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `isLoading`, `userName` |
| Functions | camelCase, verb-first | `fetchUser`, `handleSubmit` |
| Boolean variables | `is`, `has`, `should` prefix | `isAuthenticated`, `hasError` |
| Event handlers | `handle` prefix | `handleClick`, `handleChange` |
| Types / Interfaces | PascalCase, no `I` prefix | `UserProfile`, not `IUserProfile` |
| Enums | PascalCase name, PascalCase members | `UserRole.Admin` |

---

## Folder Conventions

### Top-level `src/` structure

```
src/
├── app/           # Routing only — pages, layouts, route handlers
├── components/    # Shared, cross-feature UI
├── features/      # Domain modules
├── services/      # API calls and external integrations
├── lib/           # Framework adapters, shared clients
├── hooks/         # Shared React hooks
├── types/         # Shared TypeScript types
├── utils/         # Pure functions with no side effects
├── config/        # App-level configuration
└── data/          # Static or seed data
```

### Feature module structure

Each feature in `src/features/<feature-name>/` should colocate its domain code:

```
features/auth/
├── components/    # Feature-specific UI
├── hooks/         # Feature-specific hooks
├── services/      # Feature API calls
├── types/         # Feature types
└── index.ts       # Public exports (optional)
```

### Boundary rules

| Directory | Contains | Does not contain |
|-----------|----------|------------------|
| `src/app/` | Routes, layouts, metadata | Business logic, API calls |
| `src/features/` | Domain logic and UI | Generic reusable primitives |
| `src/components/ui/` | Design system primitives | Feature-specific components |
| `src/services/` | Shared API integrations | UI components |
| `src/lib/` | Framework setup, clients | Feature business rules |
| `src/utils/` | Pure helper functions | React hooks or API calls |

---

## Component Conventions

### Server Components (default)

- All components are Server Components unless interactivity is required
- Do not add `"use client"` unless the component uses hooks, event handlers, or browser APIs
- Fetch data directly in Server Components when possible

### Client Components

- Add `"use client"` as the first line of the file
- Keep Client Components as small as possible — push logic to Server Components or hooks
- Name files the same as Server Components (PascalCase)

### Component structure

```tsx
// 1. Imports (external, then internal)
// 2. Types / interfaces
// 3. Component definition
// 4. Export
```

### Props

- Define explicit prop interfaces — never use inline object types for exported components
- Destructure props in the function signature
- Use `children: React.ReactNode` for composable components

### Composition

- Prefer composition over prop drilling
- Extract repeated UI into shared components in `src/components/`
- Feature-specific UI stays in the feature folder

---

## TypeScript Rules

| Rule | Detail |
|------|--------|
| Strict mode | Always enabled — do not disable strict checks |
| No `any` | Use `unknown` and narrow, or define explicit types |
| Explicit return types | Required for exported functions and public APIs |
| Prefer `interface` | For object shapes; use `type` for unions and intersections |
| Path aliases | Use `@/` imports for `src/` paths — avoid deep relative imports |
| Enums vs unions | Prefer string literal unions over enums unless values are shared at runtime |
| Null handling | Handle `null` and `undefined` explicitly — no non-null assertions unless justified |

---

## React Rules

| Rule | Detail |
|------|--------|
| Server Components first | Default to Server Components for all new components |
| Minimal client JS | Only mark components `"use client"` when necessary |
| Single responsibility | One component, one purpose |
| No business logic in JSX | Extract logic to hooks, services, or utility functions |
| Keys in lists | Always provide stable, unique `key` props |
| Accessibility | Use semantic HTML; add ARIA only when native semantics are insufficient |
| Images | Use `next/image` with explicit `width`, `height`, and meaningful `alt` text |
| Metadata | Define page metadata via `export const metadata` or `generateMetadata` |

---

## Styling Rules

| Rule | Detail |
|------|--------|
| Tailwind utilities | Primary styling method — use utility classes |
| Design tokens | Use `@theme` tokens from `globals.css` — no hardcoded colors or spacing |
| Custom CSS | Only when Tailwind utilities are insufficient |
| Dark mode | Follow the project dark mode strategy defined in design docs |
| Responsive | Mobile-first with Tailwind breakpoint prefixes |

---

## Git Rules

### Conventional Commits

All commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<optional scope>): <description>
```

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code change without feature or fix |
| `docs` | Documentation only |
| `test` | Tests only |
| `chore` | Tooling, maintenance |
| `style` | Formatting, no logic change |
| `perf` | Performance improvement |

### Branch naming

```
feature/<short-description>
fix/<short-description>
chore/<short-description>
refactor/<short-description>
docs/<short-description>
```

### Pull requests

- Keep PRs focused and small
- Include a clear description of what changed and why
- Ensure `lint`, `typecheck`, and `build` pass before requesting review
- Do not commit secrets, `.env` files, or build artifacts

---

## Code Quality

1. **Understand before changing** — Read existing code and conventions first
2. **Smallest safe change** — Implement the minimum change that solves the problem
3. **No dead code** — Remove unused imports, variables, and files
4. **No duplication** — Extract shared logic rather than copying
5. **Verify** — Run lint, typecheck, and build after changes
6. **Suggest separately** — Propose improvements outside the current task scope rather than bundling them in

---

## Related documentation

- [Architecture Decision Records](../architecture/)
- [Design system guidelines](../design/)
- [README — Branch Strategy & Commits](../../README.md)
