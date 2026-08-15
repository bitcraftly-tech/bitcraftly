import { cn } from '@/lib/cn';

type HeroCircuitStripProps = {
  position?: 'top' | 'bottom';
};

/**
 * Full-width circuit / PCB trace strip for the hero top or bottom edge.
 * Matches target: blue stepped traces, nodes, diagonal end accents + current flow.
 */
export function AiStudioHeroCircuitStrip({ position = 'bottom' }: HeroCircuitStripProps) {
  const glowId = `strip-electric-glow-${position}`;
  const gradId = `strip-electric-grad-${position}`;
  const isTop = position === 'top';

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 z-[5] h-[48px] overflow-hidden sm:h-[56px] lg:h-[64px]',
        isTop ? 'top-0' : 'bottom-0',
      )}
      aria-hidden
    >
      <svg
        className={cn(
          'absolute inset-x-0 h-full w-full',
          isTop ? 'top-0' : 'bottom-0',
          isTop && 'scale-y-[-1]',
        )}
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <filter id={glowId} x="-10%" y="-100%" width="120%" height="300%">
            <feGaussianBlur stdDeviation="1.35" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="50%" stopColor="#5b8dff" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>

        {/* Base traces — vibrant medium blue like target */}
        <g
          stroke="#5b8dff"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        >
          {/* Left parallel diagonal accents */}
          <path d="M6 50 L36 20" opacity="0.7" />
          <path d="M16 54 L46 24" opacity="0.5" />
          <path d="M26 56 L52 30" opacity="0.32" />

          {/* Left short branches */}
          <path d="M54 44 H98 L114 28 H155" opacity="0.75" />
          <path d="M70 50 H118" opacity="0.35" />
          <path d="M130 28 V14" opacity="0.5" />

          {/* Long run with small step-up */}
          <path d="M170 36 H410 L430 16 H620" opacity="0.88" />
          <path d="M250 44 H330" opacity="0.3" />
          <path d="M360 36 V48" opacity="0.45" />

          {/* Mid stepped cluster */}
          <path d="M640 16 H700 L720 36 H790 L810 16 H880" opacity="0.82" />
          <path d="M760 36 V50" opacity="0.4" />

          {/* Center-right complex steps */}
          <path d="M900 16 H960 L984 40 H1050 L1074 16 H1160" opacity="0.88" />
          <path d="M1010 40 V52" opacity="0.45" />
          <path d="M1100 16 V6" opacity="0.4" />

          {/* Right run + step */}
          <path d="M1180 36 H1280 L1300 16 H1345" opacity="0.78" />
          <path d="M1235 36 V48" opacity="0.35" />

          {/* Right parallel diagonals */}
          <path d="M1355 20 L1434 44" opacity="0.7" />
          <path d="M1365 28 L1434 50" opacity="0.48" />
          <path d="M1375 36 L1430 54" opacity="0.3" />
        </g>

        {/* Static nodes + trailing dots */}
        <g fill="#5b8dff">
          <circle cx="54" cy="44" r="2.1" opacity="0.85" />
          <circle cx="114" cy="28" r="1.7" opacity="0.7" />
          <circle cx="155" cy="28" r="2" opacity="0.8" />
          <circle cx="170" cy="36" r="1.5" opacity="0.65" />
          <circle cx="290" cy="36" r="1.35" opacity="0.5" />
          <circle cx="360" cy="36" r="1.8" opacity="0.75" />
          <circle cx="430" cy="16" r="1.5" opacity="0.65" />
          <circle cx="520" cy="16" r="1.3" opacity="0.45" />
          <circle cx="620" cy="16" r="2.1" opacity="0.85" />
          <circle cx="720" cy="36" r="1.6" opacity="0.7" />
          <circle cx="760" cy="36" r="1.35" opacity="0.5" />
          <circle cx="810" cy="16" r="1.5" opacity="0.65" />
          <circle cx="880" cy="16" r="2.1" opacity="0.85" />
          <circle cx="984" cy="40" r="1.8" opacity="0.75" />
          <circle cx="1010" cy="40" r="1.3" opacity="0.5" />
          <circle cx="1074" cy="16" r="1.6" opacity="0.7" />
          <circle cx="1160" cy="16" r="2" opacity="0.8" />
          <circle cx="1195" cy="36" r="2.2" opacity="0.85" />
          <circle cx="1214" cy="36" r="1.55" opacity="0.58" />
          <circle cx="1228" cy="36" r="1.05" opacity="0.38" />
          <circle cx="1239" cy="36" r="0.7" opacity="0.24" />
          <circle cx="1300" cy="16" r="1.5" opacity="0.65" />
          <circle cx="1345" cy="16" r="2" opacity="0.8" />
        </g>

        {/* Electric current along main traces */}
        <g
          className="motion-reduce:hidden"
          stroke={`url(#${gradId})`}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          fill="none"
        >
          <path
            d="M54 44 H98 L114 28 H155"
            strokeWidth="1.45"
            pathLength={1}
            strokeDasharray="0.24 0.76"
            className={
              isTop
                ? 'animate-[circuit-current_3s_ease-in-out_0.4s_infinite]'
                : 'animate-[circuit-current_2.8s_ease-in-out_infinite]'
            }
          />
          <path
            d="M170 36 H410 L430 16 H620"
            strokeWidth="1.55"
            pathLength={1}
            strokeDasharray="0.1 0.9"
            className={
              isTop
                ? 'animate-[circuit-current_3.8s_linear_infinite]'
                : 'animate-[circuit-current_3.5s_linear_0.25s_infinite]'
            }
          />
          <path
            d="M640 16 H700 L720 36 H790 L810 16 H880"
            strokeWidth="1.5"
            pathLength={1}
            strokeDasharray="0.16 0.84"
            className={
              isTop
                ? 'animate-[circuit-current_3.3s_ease-in-out_1s_infinite]'
                : 'animate-[circuit-current_3.1s_ease-in-out_0.7s_infinite]'
            }
          />
          <path
            d="M900 16 H960 L984 40 H1050 L1074 16 H1160"
            strokeWidth="1.5"
            pathLength={1}
            strokeDasharray="0.14 0.86"
            className={
              isTop
                ? 'animate-[circuit-current_3.4s_ease-in-out_0.6s_infinite]'
                : 'animate-[circuit-current_3.2s_ease-in-out_1.1s_infinite]'
            }
          />
          <path
            d="M1180 36 H1280 L1300 16 H1345"
            strokeWidth="1.45"
            pathLength={1}
            strokeDasharray="0.2 0.8"
            className={
              isTop
                ? 'animate-[circuit-current_3s_ease-in-out_1.3s_infinite]'
                : 'animate-[circuit-current_2.9s_ease-in-out_0.45s_infinite]'
            }
          />
          <path
            d="M6 50 L36 20"
            strokeWidth="1.25"
            pathLength={1}
            strokeDasharray="0.45 0.55"
            className={
              isTop
                ? 'animate-[circuit-current_2.4s_ease-in-out_0.8s_infinite]'
                : 'animate-[circuit-current_2.2s_ease-in-out_0.15s_infinite]'
            }
          />
          <path
            d="M1355 20 L1434 44"
            strokeWidth="1.25"
            pathLength={1}
            strokeDasharray="0.4 0.6"
            className={
              isTop
                ? 'animate-[circuit-current_2.6s_ease-in-out_0.2s_infinite]'
                : 'animate-[circuit-current_2.4s_ease-in-out_0.9s_infinite]'
            }
          />
        </g>

        {/* Live node pulses */}
        <g className="motion-reduce:hidden" fill="#67e8f9" filter={`url(#${glowId})`}>
          <circle
            cx="155"
            cy="28"
            r="2.3"
            className={
              isTop
                ? 'animate-[circuit-node-pulse_3s_ease-in-out_0.4s_infinite]'
                : 'animate-[circuit-node-pulse_2.8s_ease-in-out_infinite]'
            }
          />
          <circle
            cx="360"
            cy="36"
            r="2.1"
            className={
              isTop
                ? 'animate-[circuit-node-pulse_3.8s_ease-in-out_infinite]'
                : 'animate-[circuit-node-pulse_3.5s_ease-in-out_0.25s_infinite]'
            }
          />
          <circle
            cx="620"
            cy="16"
            r="2.4"
            className={
              isTop
                ? 'animate-[circuit-node-pulse_3.8s_ease-in-out_0.7s_infinite]'
                : 'animate-[circuit-node-pulse_3.5s_ease-in-out_0.9s_infinite]'
            }
          />
          <circle
            cx="880"
            cy="16"
            r="2.4"
            className={
              isTop
                ? 'animate-[circuit-node-pulse_3.3s_ease-in-out_1s_infinite]'
                : 'animate-[circuit-node-pulse_3.1s_ease-in-out_0.7s_infinite]'
            }
          />
          <circle
            cx="1160"
            cy="16"
            r="2.3"
            className={
              isTop
                ? 'animate-[circuit-node-pulse_3.4s_ease-in-out_0.6s_infinite]'
                : 'animate-[circuit-node-pulse_3.2s_ease-in-out_1.1s_infinite]'
            }
          />
          <circle
            cx="1345"
            cy="16"
            r="2.2"
            className={
              isTop
                ? 'animate-[circuit-node-pulse_3s_ease-in-out_1.3s_infinite]'
                : 'animate-[circuit-node-pulse_2.9s_ease-in-out_0.45s_infinite]'
            }
          />
        </g>
      </svg>
    </div>
  );
}
