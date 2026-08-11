'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import {
  HERO_INDUSTRY_PREVIEWS,
  HERO_INDUSTRY_ROTATE_MS,
  HERO_SYSTEM,
} from './hero.constants';
import { SystemBrowserCarousel } from './SystemBrowserCarousel';

/**
 * Connected Industry System composition (layout frozen):
 * Website → AI → Dashboard → Analytics + floating ops cards.
 * Premium motion: industry auto-rotate, float, analytics pulse.
 */
export function SystemComposition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [industryIndex, setIndustryIndex] = useState(0);
  const [contentKey, setContentKey] = useState(0);
  const [rotateEpoch, setRotateEpoch] = useState(0);
  const preview = HERO_INDUSTRY_PREVIEWS[industryIndex] ?? HERO_INDUSTRY_PREVIEWS[0];

  const onRotate = useEffectEvent(() => {
    setIndustryIndex((current) => (current + 1) % HERO_INDUSTRY_PREVIEWS.length);
    setContentKey((key) => key + 1);
  });

  const onSelectIndex = useEffectEvent((index: number) => {
    setIndustryIndex(index);
    setContentKey((key) => key + 1);
    setRotateEpoch((epoch) => epoch + 1);
  });

  /* Industry auto-rotate — restarts after swipe so dwell time feels natural. */
  useEffect(() => {
    const root = rootRef.current;
    if (root) root.dataset.sysClient = 'mounted';

    let timer = 0;

    const start = () => {
      window.clearInterval(timer);
      if (document.visibilityState === 'hidden') return;
      timer = window.setInterval(onRotate, HERO_INDUSTRY_ROTATE_MS);
    };

    start();
    document.addEventListener('visibilitychange', start);
    return () => {
      document.removeEventListener('visibilitychange', start);
      window.clearInterval(timer);
    };
  }, [rotateEpoch]);

  return (
    <div className="sys" ref={rootRef} aria-hidden="true" data-sys-client="pending">
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
            durationMs={HERO_INDUSTRY_ROTATE_MS}
            onSelectIndex={onSelectIndex}
          />
        </div>
      </div>
    </div>
  );
}
