# Bitcraftly Design System Audit Report

**Date:** 2026-08-04 (Pass 2 — full re-audit)  
**Scope:** Full marketing platform consistency (not a redesign)  
**Status:** High + Medium fixes applied

---

## Verdict

Pass 1 closed critical token gaps and consolidated FAQ/CTA.  
Pass 2 tokenized remaining live chrome hardcodes (final CTA, process side-CTA, footer) and cleaned `oklab` / ease drift.

No redesign. Structure and branding unchanged.

---

## High Issues

| ID  | Issue                                      | Status                                                         |
| --- | ------------------------------------------ | -------------------------------------------------------------- |
| H1  | Final CTA band hardcoded indigo/navy hexes | **Fixed** — `--inverse` / `--primary` / `--inverse-foreground` |
| H2  | Process side-CTA hardcoded navy gradient   | **Fixed** — inverse + primary mix                              |
| H3  | Footer accent/focus `#33e0f0`              | **Fixed** — `--accent` + inverse tokens                        |

## Medium Issues

| ID  | Issue                                  | Status                              |
| --- | -------------------------------------- | ----------------------------------- |
| M1  | Stale Work CTA CSS off-brand hexes     | **Fixed** — mapped to tokens        |
| M2  | AI Assistant `oklab` color-mix         | **Fixed** — `srgb`                  |
| M3  | Owner CRM / Admin / Owner Auth `oklab` | **Fixed** — `srgb`                  |
| M4  | Estimator `--ae-ease` duplicate        | **Fixed** — `var(--ms-ease)`        |
| M5  | Enterprise skins local ease            | **Fixed** — `var(--ms-ease-spring)` |
| M6  | Final CTA radius `14px`                | **Fixed** — `var(--ms-radius-sm)`   |
| M7  | Font weights 650/750                   | Deferred                            |

## Low Issues (deferred)

- Homepage hero mock browser / product illustration hexes
- Homepage hero CTA size vs `bc-btn` (intentional)
- Homepage `_archive/**` leftovers
- Portfolio / interactive-demo showcase brand hexes
- Broad `work.css` literal spacing/radius sprawl
- Unrouted modules under `src/components/{work,industries,ai-solutions}`

## Pass 1 verified still intact

- `--card`, `--ring`, `--destructive`, dark inverse
- `--ms-*` page skins
- Canonical `FaqAccordion` + `MarketingFinalCtaBand`
- Live `#eef2ff` / `#7c3aed` cleanup

## What changed (Pass 2)

- `marketing-final-cta-band/final-cta.css` — tokenized dark band
- `homepage/Process/process.css` — tokenized side CTA
- `homepage/Footer/footer.css` — tokenized chrome + focus
- `work.css` — neutralized stale CTA hexes
- `ai-assistant.css`, `owner-crm.css`, `admin.css`, `owner-auth.css` — `oklab` → `srgb`
- `estimator.css`, `homepage-enterprise-*.css` — `--ms-*` ease aliases
