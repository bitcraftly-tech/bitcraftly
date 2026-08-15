'use client';

import type { CSSProperties } from 'react';

type ElectricTiming = {
  outerDelay: number;
  outerDuration: number;
  innerDelay: number;
  innerDuration: number;
  tickDelays: [number, number, number, number];
  tickDurations: [number, number, number, number];
  nodeDelays: [number, number, number, number];
  nodeDuration: number;
};

/** Deterministic pseudo-random from frame id — stable across SSR/CSR. */
function seeded(frameId: string, salt: number, min: number, max: number) {
  let hash = salt * 2654435761;
  for (let i = 0; i < frameId.length; i += 1) {
    hash = (hash * 33 + frameId.charCodeAt(i)) >>> 0;
  }
  return min + (hash % (max - min + 1));
}

function createTiming(frameId: string): ElectricTiming {
  return {
    outerDelay: seeded(frameId, 1, 0, 2200),
    outerDuration: seeded(frameId, 2, 2200, 3800),
    innerDelay: seeded(frameId, 3, 0, 2400),
    innerDuration: seeded(frameId, 4, 2400, 4000),
    tickDelays: [
      seeded(frameId, 5, 0, 2000),
      seeded(frameId, 6, 0, 2000),
      seeded(frameId, 7, 0, 2000),
      seeded(frameId, 8, 0, 2000),
    ],
    tickDurations: [
      seeded(frameId, 9, 1400, 2400),
      seeded(frameId, 10, 1400, 2400),
      seeded(frameId, 11, 1600, 2600),
      seeded(frameId, 12, 1600, 2600),
    ],
    nodeDelays: [
      seeded(frameId, 13, 0, 2200),
      seeded(frameId, 14, 0, 2200),
      seeded(frameId, 15, 0, 2200),
      seeded(frameId, 16, 0, 2200),
    ],
    nodeDuration: seeded(frameId, 17, 2000, 3600),
  };
}

type ModuleIconElectricProps = {
  frameId: string;
  stroke: string;
  outerPath: string;
  innerPath: string;
};

function motionVars(durationMs: number, delayMs: number): CSSProperties {
  return {
    ['--motion-duration' as string]: `${durationMs}ms`,
    ['--motion-delay' as string]: `${delayMs}ms`,
  };
}

/**
 * Per-card electric current — timings seeded by frameId so cards stay desynced.
 * Duration/delay via CSS variables (no inline animation strings).
 */
export function AiStudioModuleIconElectric({
  frameId,
  stroke,
  outerPath,
  innerPath,
}: ModuleIconElectricProps) {
  const timing = createTiming(frameId);
  const glowId = `mod-electric-glow-${frameId}`;
  const gradId = `mod-electric-grad-${frameId}`;

  return (
    <g className="motion-reduce:hidden">
      <defs>
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="45%" stopColor={stroke} />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>

      <g filter={`url(#${glowId})`}>
        <path
          d={outerPath}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="0.18 0.82"
          className="motion-circuit-flow"
          style={motionVars(timing.outerDuration, timing.outerDelay)}
        />
        <path
          d={innerPath}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="0.22 0.78"
          className="motion-circuit-flow"
          style={motionVars(timing.innerDuration, timing.innerDelay)}
        />
        <path
          d="M1 38 H9"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.5 0.5"
          className="motion-circuit-flow"
          style={motionVars(timing.tickDurations[0], timing.tickDelays[0])}
        />
        <path
          d="M75 38 H67"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.5 0.5"
          className="motion-circuit-flow"
          style={motionVars(timing.tickDurations[1], timing.tickDelays[1])}
        />
        <path
          d="M38 1 V8"
          stroke={`url(#${gradId})`}
          strokeWidth="1.3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.55 0.45"
          className="motion-circuit-flow"
          style={motionVars(timing.tickDurations[2], timing.tickDelays[2])}
        />
        <path
          d="M38 75 V68"
          stroke={`url(#${gradId})`}
          strokeWidth="1.3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.55 0.45"
          className="motion-circuit-flow"
          style={motionVars(timing.tickDurations[3], timing.tickDelays[3])}
        />
      </g>

      <g fill="#67e8f9" filter={`url(#${glowId})`}>
        {(
          [
            [26, 4],
            [50, 4],
            [50, 72],
            [26, 72],
          ] as const
        ).map(([cx, cy], i) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="2"
            className="motion-circuit-node"
            style={motionVars(timing.nodeDuration, timing.nodeDelays[i] ?? 0)}
          />
        ))}
      </g>
    </g>
  );
}
