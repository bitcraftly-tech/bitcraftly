/**
 * Critical boot CSS — inlined so the splash never depends on the CSS bundle.
 * While `html.bc-booting`, page content stays hidden; splash stays visible.
 */
export const APP_BOOT_CRITICAL_CSS = `
html.bc-booting {
  background: #ffffff;
}
html.bc-booting body {
  overflow: hidden !important;
}
html.bc-booting body > *:not(#bc-boot-splash) {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
#bc-boot-splash {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 24px;
  background: #ffffff;
  transition: opacity 280ms ease, visibility 280ms ease;
}
#bc-boot-splash[data-done="true"] {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.bc-boot-splash__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
.bc-boot-splash__logo-wrap {
  position: relative;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
}
.bc-boot-splash__ring {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 1.5px solid rgba(37, 99, 235, 0.12);
  border-top-color: #2563eb;
  border-right-color: rgba(37, 99, 235, 0.45);
  animation: bc-boot-spin 0.9s linear infinite;
}
.bc-boot-splash__ring--delayed {
  inset: -4px;
  border-width: 1px;
  border-color: rgba(37, 99, 235, 0.08);
  border-bottom-color: rgba(37, 99, 235, 0.55);
  animation-duration: 1.35s;
  animation-direction: reverse;
}
.bc-boot-splash__logo-glow {
  position: absolute;
  inset: 7px;
  border-radius: 11px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.32), transparent 72%);
  animation: bc-boot-glow 1.6s ease-in-out infinite;
}
.bc-boot-splash__logo {
  position: relative;
  z-index: 1;
  width: 28px;
  height: 28px;
  object-fit: contain;
  border-radius: 7px;
  animation: bc-boot-float 1.6s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(37, 99, 235, 0.2));
}
@keyframes bc-boot-spin {
  to { transform: rotate(360deg); }
}
@keyframes bc-boot-float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-3px) scale(1.05); }
}
@keyframes bc-boot-glow {
  0%, 100% { opacity: 0.4; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.12); }
}
@media (prefers-reduced-motion: reduce) {
  .bc-boot-splash__logo,
  .bc-boot-splash__logo-glow,
  .bc-boot-splash__ring {
    animation: none;
  }
  .bc-boot-splash__ring {
    border-color: rgba(37, 99, 235, 0.2);
    border-top-color: #2563eb;
  }
  #bc-boot-splash {
    transition: none;
  }
}
`.trim();

/**
 * Runs before paint — marks document as booting so content stays hidden
 * until CSS + images are ready (handled by AppBootSplash client).
 */
export const APP_BOOT_INIT_SCRIPT = `
(function () {
  try {
    if (document.documentElement.classList.contains('bc-app-ready')) return;
    document.documentElement.classList.add('bc-booting');
    document.documentElement.setAttribute('aria-busy', 'true');
  } catch (_) {}
})();
`.trim();
