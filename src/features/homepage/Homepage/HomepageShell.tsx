import { HeroSection } from '../Hero';
import { HomepageBelowFold } from './HomepageBelowFold';
import './homepage-atf.css';

/**
 * Fail-open ATF CSS — hoisted to <head> via React 19 precedence so Hero
 * geometry applies before first paint (keeps footer out of the LCP viewport).
 */
const HOMEPAGE_CRITICAL_INLINE_CSS = `
#main-content{min-height:100vh}
.homepage-sections{display:block}
.hp-hero{position:relative;isolation:isolate;width:100%;color:var(--foreground,#000826);background:var(--canvas,#f8fafc)}
.hp-hero__shell{position:relative;z-index:1;box-sizing:border-box;width:100%;max-width:var(--container-xl,1400px);margin-inline:auto;padding-block:32px 28px;padding-inline:max(var(--container-padding,1.25rem),env(safe-area-inset-left,0px)) max(var(--container-padding,1.25rem),env(safe-area-inset-right,0px))}
.hp-hero__grid{display:grid;grid-template-columns:1fr;gap:48px;align-items:center;width:100%}
.hp-hero-content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:flex-start;width:100%;max-width:540px}
.hp-hero-brand{display:block;margin:0 0 28px}
.hp-hero-brand__tag{display:inline-flex;align-items:center;gap:8px;min-height:30px;padding:0 12px 0 10px;border-radius:999px;border:1px solid color-mix(in srgb,var(--primary,#3d5bff) 18%,var(--border,#e2e8f0));background:color-mix(in srgb,var(--primary,#3d5bff) 6%,#fff);color:color-mix(in srgb,var(--foreground,#000826) 72%,var(--primary,#3d5bff));font-size:12px;font-weight:600;letter-spacing:.02em;line-height:1}
.hp-hero-brand__dot{width:6px;height:6px;border-radius:999px;background:linear-gradient(135deg,var(--primary,#3d5bff),var(--primary-end,#7b5cff));box-shadow:0 0 0 3px color-mix(in srgb,var(--primary,#3d5bff) 14%,transparent)}
h1#hero-heading.hp-hero-heading{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:0;width:fit-content;max-width:100%;margin:0 0 28px;padding:0;background:none;border:0;box-shadow:none;color:var(--foreground,#000826) !important;font-size:clamp(2.35rem,4.8vw,3.7rem) !important;font-weight:800 !important;line-height:1 !important;letter-spacing:-.04em;font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif}
h1#hero-heading .hp-hero-heading__lead{display:block;margin:0 0 .18em;font-size:.3em;line-height:1}
h1#hero-heading .hp-hero-heading__lead-text{color:color-mix(in srgb,var(--foreground,#000826) 58%,var(--muted,#64748b)) !important;font-weight:700;letter-spacing:.32em;text-transform:uppercase}
h1#hero-heading .hp-hero-heading__focus{display:block;position:relative;width:fit-content;margin:0;color:var(--primary,#3d5bff) !important;font-family:var(--font-hero-hand),cursive;font-size:1.22em;font-weight:700;line-height:.92}
h1#hero-heading .hp-hero-heading__sub{display:inline-flex;align-items:baseline;gap:.3em;margin:0;font-size:.5em;line-height:1.05}
h1#hero-heading .hp-hero-heading__sub-lead{color:color-mix(in srgb,var(--foreground,#000826) 70%,var(--muted,#64748b)) !important;font-weight:600}
h1#hero-heading .hp-hero-heading__sub-accent{font-family:var(--font-hero-hand),cursive;color:var(--primary,#3d5bff) !important;font-size:1.42em;font-weight:700}
@media (min-width:1024px){.hp-hero__grid{grid-template-columns:minmax(0,42%) minmax(0,58%);column-gap:40px}}
@media (min-width:1280px){.hp-hero__shell{padding-block:36px 32px}}
@media (max-width:767px){h1#hero-heading.hp-hero-heading{font-size:2.25rem !important}}
`;

/**
 * Homepage ATF architecture:
 * - Head-hoisted critical geometry + H1 paint
 * - Consolidated ATF CSS for full Hero polish
 * - HomeStory SSR with its CSS (sync) to avoid deferred-CSS CLS
 */
export function HomepageShell() {
  return (
    <div className="homepage-sections">
      <style href="homepage-atf-critical" precedence="homepage-critical">
        {HOMEPAGE_CRITICAL_INLINE_CSS}
      </style>
      <HeroSection />
      <HomepageBelowFold />
    </div>
  );
}
