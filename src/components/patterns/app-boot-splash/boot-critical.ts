/**
 * Critical boot CSS — inlined so the splash never depends on the CSS bundle.
 * Bitcraftly logo splash: `html.bc-booting` + `#bc-boot-splash`
 * Interactive demos: `html.bc-demo-booting` + `#bc-demo-boot-splash` (no Bitcraftly logo)
 *
 * Overlay-only: never hide body children with opacity/visibility — that trapped
 * the page when the splash client island stalled. Opaque splash covers content.
 *
 * iOS WebKit: avoid `overflow:hidden` on `body` during boot — it freezes
 * descendant CSS animations (same class of bug as hero `overflow:clip`).
 */
export const APP_BOOT_CRITICAL_CSS = `
html.bc-booting,
html.bc-demo-booting {
  background: #ffffff !important;
  background-image: none !important;
  /* Lock scroll on html — not body — so splash ring/logo animations stay live on iOS */
  overflow: hidden !important;
  height: 100% !important;
  overscroll-behavior: none;
}
html.bc-demo-booting {
  background: var(--demo-boot-bg, #f8fafc) !important;
}
html.bc-booting body,
html.bc-demo-booting body {
  overflow: visible !important;
  background: #ffffff !important;
  background-image: none !important;
  overscroll-behavior: none;
  touch-action: none;
}
html.bc-demo-booting body {
  background: var(--demo-boot-bg, #f8fafc) !important;
}
html.bc-demo-booting #bc-boot-splash {
  display: none !important;
}
html.bc-booting #bc-demo-boot-splash {
  display: none !important;
}
#bc-boot-splash,
#bc-demo-boot-splash {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 24px;
  overflow: visible;
  background: #ffffff !important;
  background-image: none !important;
  box-shadow: none !important;
  /* Own compositor layer — keeps infinite spin alive on iOS Safari */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  isolation: isolate;
  transition: opacity 220ms ease, visibility 220ms ease;
}
#bc-demo-boot-splash {
  background: var(--demo-boot-bg, #f8fafc) !important;
  color: var(--demo-boot-fg, #0f172a);
}
#bc-boot-splash[data-done="true"],
#bc-demo-boot-splash[data-done="true"],
html.bc-app-ready #bc-boot-splash,
html.bc-app-ready #bc-demo-boot-splash {
  opacity: 0;
  visibility: hidden;
  pointer-events: none !important;
}
.bc-boot-splash__inner,
.bc-demo-boot__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
.bc-boot-splash__logo-wrap,
.bc-demo-boot__mark-wrap {
  position: relative;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  background: transparent;
  box-shadow: none;
  overflow: visible;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
.bc-demo-boot__mark-wrap {
  width: 56px;
  height: 56px;
}
.bc-boot-splash__ring,
.bc-demo-boot__ring {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  border-radius: 50%;
  /* No gray full track — only blue arcs */
  border: 2.5px solid transparent;
  border-top-color: #2563eb;
  border-right-color: rgba(37, 99, 235, 0.35);
  box-shadow: none;
  filter: none;
  background: transparent;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  will-change: transform;
  -webkit-animation: bc-boot-spin 0.85s linear infinite;
  animation: bc-boot-spin 0.85s linear infinite;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}
.bc-demo-boot__ring {
  border-color: transparent;
  border-top-color: var(--demo-boot-accent, #0f766e);
  border-right-color: color-mix(in srgb, var(--demo-boot-accent, #0f766e) 35%, transparent);
}
.bc-boot-splash__ring--delayed,
.bc-demo-boot__ring--delayed {
  inset: -5px;
  border-width: 1.5px;
  border-color: transparent;
  border-bottom-color: rgba(37, 99, 235, 0.55);
  border-left-color: rgba(37, 99, 235, 0.25);
  -webkit-animation-duration: 1.35s;
  animation-duration: 1.35s;
  -webkit-animation-direction: reverse;
  animation-direction: reverse;
}
.bc-demo-boot__ring--delayed {
  border-color: transparent;
  border-bottom-color: color-mix(in srgb, var(--demo-boot-accent, #0f766e) 55%, transparent);
  border-left-color: color-mix(in srgb, var(--demo-boot-accent, #0f766e) 25%, transparent);
}
.bc-demo-boot__glow {
  position: absolute;
  inset: 6px;
  border-radius: 14px;
  background: radial-gradient(circle, color-mix(in srgb, var(--demo-boot-accent, #0f766e) 40%, transparent), transparent 72%);
  will-change: transform, opacity;
  -webkit-animation: bc-boot-glow 1.6s ease-in-out infinite;
  animation: bc-boot-glow 1.6s ease-in-out infinite;
}
.bc-boot-splash__logo {
  position: relative;
  z-index: 1;
  width: 36px;
  height: 26px;
  object-fit: contain;
  border-radius: 0;
  background: transparent !important;
  box-shadow: none !important;
  filter: none !important;
  outline: none;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  will-change: transform;
  -webkit-animation: bc-boot-float 1.6s ease-in-out infinite;
  animation: bc-boot-float 1.6s ease-in-out infinite;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}
.bc-demo-boot__mark {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--demo-boot-accent, #0f766e);
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1;
  will-change: transform;
  -webkit-animation: bc-boot-float 1.6s ease-in-out infinite;
  animation: bc-boot-float 1.6s ease-in-out infinite;
  box-shadow: 0 6px 16px color-mix(in srgb, var(--demo-boot-accent, #0f766e) 35%, transparent);
}
.bc-demo-boot__logo {
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 10px;
  background: transparent !important;
  box-shadow: 0 8px 18px color-mix(in srgb, var(--demo-boot-accent, #5a31f4) 28%, transparent);
  will-change: transform;
  -webkit-animation: bc-boot-float 1.6s ease-in-out infinite;
  animation: bc-boot-float 1.6s ease-in-out infinite;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}
.bc-demo-boot__name {
  margin: 0;
  max-width: 16rem;
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 650;
  letter-spacing: 0.01em;
  color: inherit;
  opacity: 0.92;
}
.bc-demo-boot__hint {
  margin: 0;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.55;
}
@-webkit-keyframes bc-boot-spin {
  from { -webkit-transform: translate3d(0, 0, 0) rotate(0deg); transform: translate3d(0, 0, 0) rotate(0deg); }
  to { -webkit-transform: translate3d(0, 0, 0) rotate(360deg); transform: translate3d(0, 0, 0) rotate(360deg); }
}
@keyframes bc-boot-spin {
  from { -webkit-transform: translate3d(0, 0, 0) rotate(0deg); transform: translate3d(0, 0, 0) rotate(0deg); }
  to { -webkit-transform: translate3d(0, 0, 0) rotate(360deg); transform: translate3d(0, 0, 0) rotate(360deg); }
}
@-webkit-keyframes bc-boot-float {
  0%, 100% { -webkit-transform: translate3d(0, 0, 0) scale(1); transform: translate3d(0, 0, 0) scale(1); }
  50% { -webkit-transform: translate3d(0, -2px, 0) scale(1.03); transform: translate3d(0, -2px, 0) scale(1.03); }
}
@keyframes bc-boot-float {
  0%, 100% { -webkit-transform: translate3d(0, 0, 0) scale(1); transform: translate3d(0, 0, 0) scale(1); }
  50% { -webkit-transform: translate3d(0, -2px, 0) scale(1.03); transform: translate3d(0, -2px, 0) scale(1.03); }
}
@-webkit-keyframes bc-boot-glow {
  0%, 100% { opacity: 0.4; -webkit-transform: scale(0.9); transform: scale(0.9); }
  50% { opacity: 1; -webkit-transform: scale(1.12); transform: scale(1.12); }
}
@keyframes bc-boot-glow {
  0%, 100% { opacity: 0.4; -webkit-transform: scale(0.9); transform: scale(0.9); }
  50% { opacity: 1; -webkit-transform: scale(1.12); transform: scale(1.12); }
}
@media (prefers-reduced-motion: reduce) {
  .bc-boot-splash__logo,
  .bc-boot-splash__ring,
  .bc-demo-boot__mark,
  .bc-demo-boot__logo,
  .bc-demo-boot__glow,
  .bc-demo-boot__ring {
    -webkit-animation: none !important;
    animation: none !important;
    will-change: auto;
  }
  .bc-boot-splash__ring {
    border-color: transparent;
    border-top-color: #2563eb;
  }
  .bc-demo-boot__ring {
    border-color: color-mix(in srgb, var(--demo-boot-accent, #0f766e) 25%, transparent);
    border-top-color: var(--demo-boot-accent, #0f766e);
  }
  #bc-boot-splash,
  #bc-demo-boot-splash {
    transition: none;
  }
}
`.trim();

/**
 * Runs before paint — picks Bitcraftly boot vs interactive-demo boot from pathname.
 */
export const APP_BOOT_INIT_SCRIPT = `
(function () {
  try {
    var root = document.documentElement;
    if (root.classList.contains('bc-app-ready')) return;
    var path = location.pathname || '';
    var isDemo =
      path.indexOf('/interactive-demos/') === 0 ||
      (path.indexOf('/portfolio/') === 0 && path.length > '/portfolio/'.length);
    root.classList.remove('bc-booting', 'bc-demo-booting');
    if (isDemo) {
      root.classList.add('bc-demo-booting');
      root.setAttribute('data-demo-boot', '1');
      root.setAttribute('data-demo-path', path);
    } else {
      root.classList.add('bc-booting');
      root.removeAttribute('data-demo-boot');
      root.removeAttribute('data-demo-path');
    }
    root.setAttribute('aria-busy', 'true');
  } catch (_) {}
})();
`.trim();
