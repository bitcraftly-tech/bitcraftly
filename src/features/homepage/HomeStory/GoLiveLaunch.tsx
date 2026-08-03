'use client';

import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

const GO_LIVE = [
  { step: '01', title: 'Choose Industry', body: 'Pick your Wave 1 Industry System.' },
  { step: '02', title: 'Configure System', body: 'Select the modules you need.' },
  { step: '03', title: 'Customize Brand', body: 'Apply identity, content, and domain.' },
  { step: '04', title: 'Launch', body: 'Ship deployment-ready — go live.' },
] as const;

/** Negative delays into the shared 6.5s timeline (matches rail/node keyframes). */
const SEEK_DELAYS_S = [0, 0.52, 1.17, 1.82] as const;
const COMPACT_QUERY = '(max-width: 899px)';

export function GoLiveLaunch() {
  const [compact, setCompact] = useState(false);
  const [seek, setSeek] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const media = window.matchMedia(COMPACT_QUERY);
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const selectStep = useCallback((index: number) => {
    setSeek(index);
    setAnimKey((key) => key + 1);
  }, []);

  const seekDelay = `-${SEEK_DELAYS_S[seek] ?? 0}s`;

  return (
    <div
      key={animKey}
      className="hs-launch"
      style={{ ['--hs-launch-seek' as string]: compact ? seekDelay : '0s' }}
    >
      <ol className="hs-launch__steps">
        {GO_LIVE.map((item, index) => {
          const isLast = index === GO_LIVE.length - 1;

          return (
            <li
              key={item.step}
              className={cn('hs-launch__step', isLast && 'hs-launch__step--end')}
              style={{ ['--hs-launch-i' as string]: index }}
            >
              <div className="hs-launch__node">
                {compact ? (
                  <button
                    type="button"
                    className="hs-launch__num"
                    aria-label={`Step ${item.step}: ${item.title}`}
                    onClick={() => selectStep(index)}
                  >
                    {item.step}
                  </button>
                ) : (
                  <span className="hs-launch__num">{item.step}</span>
                )}
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
