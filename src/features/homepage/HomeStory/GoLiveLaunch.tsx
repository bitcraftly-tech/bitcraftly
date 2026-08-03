'use client';

import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

const GO_LIVE = [
  { step: '01', title: 'Choose Industry', body: 'Pick your Wave 1 Industry System.' },
  { step: '02', title: 'Configure System', body: 'Select the modules you need.' },
  { step: '03', title: 'Customize Brand', body: 'Apply identity, content, and domain.' },
  { step: '04', title: 'Launch', body: 'Ship deployment-ready — go live.' },
] as const;

const AUTOPLAY_MS = 1600;
const RESUME_MS = 5000;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function GoLiveLaunch() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) {
      return;
    }

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % GO_LIVE.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  useEffect(() => {
    if (!paused || reduceMotion) {
      return;
    }

    const id = window.setTimeout(() => setPaused(false), RESUME_MS);
    return () => window.clearTimeout(id);
  }, [paused, active, reduceMotion]);

  const selectStep = useCallback((index: number) => {
    setActive(index);
    setPaused(true);
  }, []);

  return (
    <div className="hs-launch hs-launch--interactive" data-active-step={active}>
      <ol className="hs-launch__steps">
        {GO_LIVE.map((item, index) => {
          const isLast = index === GO_LIVE.length - 1;
          const state = reduceMotion
            ? 'done'
            : index < active
              ? 'done'
              : index === active
                ? 'active'
                : 'pending';

          return (
            <li
              key={item.step}
              className={cn(
                'hs-launch__step',
                isLast && 'hs-launch__step--end',
                state === 'active' && 'hs-launch__step--active',
                state === 'done' && 'hs-launch__step--done',
                state === 'pending' && 'hs-launch__step--pending',
              )}
              style={{ ['--hs-launch-i' as string]: index }}
            >
              <div className="hs-launch__node">
                <button
                  type="button"
                  className="hs-launch__num"
                  aria-current={state === 'active' ? 'step' : undefined}
                  aria-label={`Step ${item.step}: ${item.title}`}
                  onClick={() => selectStep(index)}
                >
                  {item.step}
                </button>
                {!isLast ? (
                  <span className="hs-launch__rail" aria-hidden="true">
                    <i className="hs-launch__rail-flow" />
                  </span>
                ) : null}
              </div>
              <div className="hs-launch__copy">
                <strong className="hs-launch__title">{item.title}</strong>
                <p className="hs-launch__body">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
