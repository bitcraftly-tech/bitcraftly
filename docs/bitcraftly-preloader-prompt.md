# Bitcraftly Preloader — Design & Implementation Prompt

Use this prompt to recreate or extend the global loading screen.

---

## Visual spec

Create a **full-viewport centered splash / preloader** for **Bitcraftly** on a **pure white** background (`#FFFFFF`).

### Logo (top)
- **2×2 grid** of four rounded squares (`rounded-md` / `rounded-lg`), evenly spaced.
- **Colors:** top-left and bottom-right = vibrant purple `#7C3AED`; top-right and bottom-left = dark navy `#111827`.
- Optional subtle **breathing scale** animation on the whole logo block (1 → 1.03 → 1, ~2.4s loop).

### Typography (center stack)
1. **Brand name:** `Bitcraftly` — bold sans-serif (Inter), `#111827`, ~1.65–2rem.
2. **Tagline:** `Digital Solutions, Crafted for Growth` — regular weight, same navy family, ~0.95rem, slightly muted.

### Loading indicator (below tagline)
- **Five dots** in a horizontal row, evenly spaced (`gap-8px`), circular (`8–10px`).
- **Animation:** sequential pulse — each dot cycles gray → purple `#7C3AED` → lavender `#A78BFA` → gray, with staggered delay (`0.15s` per dot). Scale 0.82 → 1.12 → 1.
- **Label:** `Loading…` in light gray `#9CA3AF`, small text below dots.

### Layout
- Flex column, vertically and horizontally centered.
- Generous whitespace; no borders or cards around content.
- Fade-in on mount (content slides up ~10px, 0.55s ease-out).

---

## Behavior (functional)

1. **Full-screen fixed overlay** `z-index: 9999`, white background, covers entire site on first paint.
2. **Show once per browser tab session** — after successful exit, set `sessionStorage` key `bitcraftly-preloader-done` so client navigations do not repeat it.
3. **Dismiss when:**
   - `window` `load` event fires, AND
   - minimum display time ~750ms has elapsed (avoid flash), OR
   - maximum timeout ~4s (fallback if load hangs).
4. **Exit:** fade out entire overlay ~450ms, then remove from DOM; set session flag.
5. **`prefers-reduced-motion`:** skip animations; hide immediately after load (no min delay).
6. **Accessibility:** `role="status"`, `aria-live="polite"`, `aria-busy` while loading, `aria-label="Loading Bitcraftly"`.

---

## Integration (Next.js App Router)

- Client component in **root `app/layout.tsx`** inside `<body>`, before main app tree.
- CSS keyframes in `globals.css` (`.bc-preloader`, `.bc-preloader__dot`, etc.).
- Reusable logo: `components/brand/BitcraftlyLogoMark.tsx`.

---

## Do not

- Block interaction after dismiss (remove overlay from DOM).
- Show on every Next.js client-side route change (session-only).
- Change global site theme colors outside the preloader layer.

---

## Optional extensions

- Show again only when user clears site data or add `?preload=1` query override for demos.
- Dark mode variant (only if brand requires; default mockup is light).
- Progress bar tied to real asset loading (advanced).
