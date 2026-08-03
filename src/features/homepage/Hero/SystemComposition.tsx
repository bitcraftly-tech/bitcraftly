'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import {
  HERO_INDUSTRY_PREVIEWS,
  HERO_INDUSTRY_ROTATE_MS,
  HERO_SYSTEM,
} from './hero.constants';
import { SystemBrowserCarousel } from './SystemBrowserCarousel';

const MOBILE_ROTATE_MS = 4200;
const FLOAT_LAYER_SELECTOR =
  '.sys__analytics, .sys__dashboard, .sys__ai, .sys__website, .sys__glow, .sys__live, .sys__panel--analytics';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isCompactViewport(): boolean {
  return window.matchMedia('(max-width: 1023px)').matches;
}

function subscribeMedia(media: MediaQueryList, onChange: () => void): () => void {
  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }
  // Safari < 14
  media.addListener(onChange);
  return () => media.removeListener(onChange);
}

/** iOS WebKit often freezes CSS animations until a paint kick after load/touch. */
function restartCssAnimations(root: HTMLElement) {
  const nodes = root.querySelectorAll<HTMLElement>(FLOAT_LAYER_SELECTOR);
  nodes.forEach((node) => {
    const prev = node.style.animation;
    node.style.animation = 'none';
    // Force reflow so WebKit drops the paused compositor state.
    void node.offsetWidth;
    node.style.animation = prev;
  });
}

/**
 * Connected Industry System composition (layout frozen):
 * Website → AI → Dashboard → Analytics + floating ops cards.
 * Premium motion: industry auto-rotate, parallax, float, analytics pulse.
 */
export function SystemComposition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [industryIndex, setIndustryIndex] = useState(0);
  const [contentKey, setContentKey] = useState(0);
  const [rotateMs, setRotateMs] = useState(HERO_INDUSTRY_ROTATE_MS);
  const preview = HERO_INDUSTRY_PREVIEWS[industryIndex] ?? HERO_INDUSTRY_PREVIEWS[0];

  const onRotate = useEffectEvent(() => {
    setIndustryIndex((current) => (current + 1) % HERO_INDUSTRY_PREVIEWS.length);
    setContentKey((key) => key + 1);
  });

  useEffect(() => {
    const syncRotateMs = () => {
      setRotateMs(isCompactViewport() ? MOBILE_ROTATE_MS : HERO_INDUSTRY_ROTATE_MS);
    };
    syncRotateMs();
    const mq = window.matchMedia('(max-width: 1023px)');
    return subscribeMedia(mq, syncRotateMs);
  }, []);

  /* Industry auto-rotate — rAF ticker (setInterval is heavily throttled on iOS). */
  useEffect(() => {
    const reduceMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let lastTick = performance.now();
    let running = true;

    const tick = (now: number) => {
      if (!running) return;
      raf = window.requestAnimationFrame(tick);

      if (reduceMedia.matches || document.visibilityState === 'hidden') {
        lastTick = now;
        return;
      }

      const interval = isCompactViewport() ? MOBILE_ROTATE_MS : HERO_INDUSTRY_ROTATE_MS;
      if (now - lastTick >= interval) {
        lastTick = now;
        onRotate();
      }
    };

    const onVisible = () => {
      lastTick = performance.now();
      const root = rootRef.current;
      if (root && !reduceMedia.matches) {
        restartCssAnimations(root);
      }
    };

    raf = window.requestAnimationFrame(tick);
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('pageshow', onVisible);
    const unsubscribe = subscribeMedia(reduceMedia, onVisible);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('pageshow', onVisible);
      unsubscribe();
    };
  }, []);

  /* Kick frozen WebKit animations after first touch / short delay. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const kick = () => {
      if (prefersReducedMotion()) return;
      restartCssAnimations(root);
    };

    const delay = window.setTimeout(kick, 350);
    document.addEventListener('touchstart', kick, { once: true, passive: true });
    document.addEventListener('pointerdown', kick, { once: true });

    return () => {
      window.clearTimeout(delay);
      document.removeEventListener('touchstart', kick);
      document.removeEventListener('pointerdown', kick);
    };
  }, []);

  /* Desktop-only pointer parallax */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (prefersReducedMotion() || !finePointer.matches) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = root.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        root.style.setProperty('--sys-px', (x * 10).toFixed(2));
        root.style.setProperty('--sys-py', (y * 8).toFixed(2));
      });
    };

    const onLeave = () => {
      root.style.setProperty('--sys-px', '0');
      root.style.setProperty('--sys-py', '0');
    };

    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="sys" ref={rootRef} aria-hidden="true">
      <div className="sys__glow" />
      <div className="sys__glow sys__glow--mesh" />
      <div className="sys__ring" />
      <div className="sys__shadow" />

      <div className="sys__meta">
        <p key={`label-${preview.id}`} className="sys__label sys__label--swap">
          {preview.label}
        </p>
        <div className="sys__flow">
          {HERO_SYSTEM.flow.map((step, index) => (
            <span key={step} className="sys__flow-item">
              {index > 0 ? (
                <span className="sys__flow-arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 8" fill="none" className="sys__flow-arrow-icon">
                    <path
                      d="M1 4h12M10 1l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : null}
              <span className="sys__flow-chip">{step}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="sys__stage">
        <div className="sys__layer sys__analytics sys__parallax-a">
          <div key={`analytics-${contentKey}`} className="sys__panel sys__panel--analytics sys__swap">
            <div className="sys__panel-head">
              <span>Analytics</span>
              <span className="sys__live">Live</span>
            </div>
            <div className="sys__kpi-row">
              {preview.analytics.kpis.map((kpi) => (
                <div key={kpi.label} className="sys__kpi">
                  <strong>{kpi.value}</strong>
                  <span>{kpi.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sys__layer sys__dashboard sys__parallax-b">
          <div key={`dash-${contentKey}`} className="sys__panel sys__panel--dash sys__swap">
            <div className="sys__panel-head">{preview.dashboard.title}</div>
            <div className="sys__dash-grid">
              {preview.dashboard.panels.map((panel) => (
                <span key={panel} className="sys__dash-tile">
                  {panel}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="sys__layer sys__ai sys__parallax-c">
          <div key={`ai-${contentKey}`} className="sys__panel sys__panel--ai sys__swap">
            <div className="sys__panel-head">
              <span className="sys__ai-dot" />
              {preview.ai.title}
            </div>
            <p className="sys__ai-msg">{preview.ai.message}</p>
            <div className="sys__ai-suggestions">
              {preview.ai.suggestions.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="sys__layer sys__website sys__parallax-d">
          <SystemBrowserCarousel
            items={HERO_INDUSTRY_PREVIEWS}
            activeIndex={industryIndex}
            durationMs={rotateMs}
          />
        </div>
      </div>
    </div>
  );
}
