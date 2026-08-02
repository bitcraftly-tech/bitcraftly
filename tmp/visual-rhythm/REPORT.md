# Phase 2 — Premium Visual Rhythm

**Branch:** `feature/homepage-premium-polish`  
**Scope:** Section background cadence + soft transitions only  
**Hero:** Untouched

## Checks

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run build` | Passed |
| Desktop / tablet / mobile | Verified |

## Files changed

- `src/features/homepage/Homepage/homepage-visual-rhythm.css` *(new)*
- `src/features/homepage/HomeStory/HomeStorySections.tsx` *(import only)*

## Visual improvements

| Section | Surface |
| --- | --- |
| Hero | Existing mesh (unchanged) |
| Business Outcomes | Pure white |
| Delivery Path | Soft lavender `#FAF7FF` + soft top radial |
| What's Included | White |
| Industry Systems | Subtle purple radial mesh + light noise |
| AI Automation | White |
| Ecosystem Dashboard | Deep `#0F172A` + violet glow + noise; light ink tokens |
| Connected Workflows | White + soft top fade from dark |
| Why Industry Systems | Soft gray/lavender `#F4F2F8` |
| Go Live Faster | White |
| CTA Band | Purple mesh gradient + texture/glow restored |
| Newsletter | Dark + subtle violet radials |
| Footer | Existing dark (unchanged) |

Soft section seams via top fades (no hard separators). Spacing, grid, type scale, cards unchanged.

## Regressions

- None in build/typecheck.
- Hero CSS/TSX unmodified.
- Copy / IA / section order unchanged.
- Dashboard dark surface uses scoped `--hs-ink` / `--hs-muted` for contrast only.
- Note: global lead-widget overlay can appear in section screenshots; unrelated to this phase.

## Screenshots

### Before
- `tmp/visual-rhythm/before-desktop-fold.png`
- `tmp/visual-rhythm/before-tablet-fold.png`
- `tmp/visual-rhythm/before-mobile-fold.png`
- `tmp/visual-rhythm/before-desktop-story.png`

### After
- `tmp/visual-rhythm/after-desktop-fold.png`
- `tmp/visual-rhythm/after-tablet-fold.png`
- `tmp/visual-rhythm/after-mobile-fold.png`
- Per-section: `after-desktop-{outcomes,path,included,wave,auto,dash,mesh,why,live,invite}.png`
- Responsive: `after-tablet-dash.png`, `after-mobile-dash.png`, `after-mobile-invite.png`
