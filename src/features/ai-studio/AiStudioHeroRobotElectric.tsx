import { cn } from '@/lib/cn';

type Trace = {
  d: string;
  width?: number;
  color?: 'grad' | 'cyan' | 'blue' | 'violet';
  delay?: string;
  duration?: string;
  dash?: string;
  kind?: 'flow' | 'bolt' | 'spark';
  opacity?: number;
};

const COLORS = {
  grad: 'url(#hero-electric-grad)',
  cyan: '#67e8f9',
  blue: '#3b82f6',
  violet: '#a78bfa',
} as const;

/**
 * Soft, sparse body traces — enough to read as current without clutter.
 */
const ROBOT_TRACES: Trace[] = [
  // Ear sensor ring
  {
    d: 'M138 62 C152 62 162 74 158 88 C154 100 140 106 128 100 C118 94 116 78 126 68 C130 64 134 62 138 62',
    width: 1.1,
    delay: '0.2s',
    duration: '3.6s',
    dash: '0.14 0.86',
    kind: 'flow',
    opacity: 0.75,
  },
  // Neck cable
  {
    d: 'M112 112 L118 130 L116 148',
    width: 0.95,
    color: 'cyan',
    delay: '0.8s',
    duration: '3.2s',
    dash: '0.18 0.82',
    kind: 'flow',
    opacity: 0.7,
  },
  // Shoulder plate
  {
    d: 'M88 162 L130 158 L138 178 L124 196 L86 190 L80 170 Z',
    width: 1,
    delay: '0.4s',
    duration: '4s',
    dash: '0.12 0.88',
    kind: 'flow',
    opacity: 0.65,
  },
  // Chest vertical
  {
    d: 'M108 206 L114 246 L112 286 L120 318',
    width: 0.95,
    color: 'blue',
    delay: '1s',
    duration: '3.8s',
    dash: '0.12 0.88',
    kind: 'flow',
    opacity: 0.7,
  },
  // Chest horizontal
  {
    d: 'M84 258 L140 252',
    width: 0.85,
    color: 'cyan',
    delay: '1.6s',
    duration: '3.4s',
    dash: '0.16 0.84',
    kind: 'flow',
    opacity: 0.6,
  },
  // Arm outer
  {
    d: 'M148 210 L160 240 L156 270 L148 300',
    width: 0.95,
    delay: '0.6s',
    duration: '3.5s',
    dash: '0.14 0.86',
    kind: 'flow',
    opacity: 0.7,
  },
  // Forearm
  {
    d: 'M142 300 L156 320 L162 342',
    width: 0.9,
    color: 'violet',
    delay: '1.3s',
    duration: '3.3s',
    dash: '0.16 0.84',
    kind: 'flow',
    opacity: 0.65,
  },
  // Soft bolts (sparse)
  {
    d: 'M118 72 L128 102 L112 128 L130 156',
    width: 1,
    delay: '0.5s',
    duration: '3.8s',
    kind: 'bolt',
    opacity: 0.55,
  },
  {
    d: 'M100 200 L120 230 L104 260 L126 290',
    width: 0.95,
    color: 'cyan',
    delay: '1.8s',
    duration: '4.2s',
    kind: 'bolt',
    opacity: 0.5,
  },
  // Joint sparks
  {
    d: 'M118 108 L134 102 L128 116',
    width: 0.75,
    color: 'cyan',
    delay: '1.1s',
    duration: '2.8s',
    kind: 'spark',
    opacity: 0.55,
  },
  {
    d: 'M148 200 L166 194 L160 210',
    width: 0.75,
    color: 'violet',
    delay: '2s',
    duration: '2.6s',
    kind: 'spark',
    opacity: 0.5,
  },
];

/**
 * Subtle electric current along key robot panel lines.
 */
export function AiStudioHeroRobotElectric({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-10 overflow-visible opacity-70',
        'motion-reduce:hidden',
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 200 400"
        className="absolute inset-0 h-full w-full mix-blend-screen"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="hero-electric-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hero-electric-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="45%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>

        {ROBOT_TRACES.map((trace, i) => {
          const kind = trace.kind ?? 'flow';
          const duration = trace.duration ?? '3.2s';
          const delay = trace.delay ?? '0s';
          const color = COLORS[trace.color ?? 'grad'];

          const animation =
            kind === 'bolt'
              ? `electric-bolt ${duration} ease-in-out ${delay} infinite`
              : kind === 'spark'
                ? `electric-spark ${duration} ease-in-out ${delay} infinite`
                : `circuit-current ${duration} ease-in-out ${delay} infinite`;

          return (
            <path
              key={`robot-trace-${i}`}
              d={trace.d}
              stroke={color}
              strokeWidth={trace.width ?? 1}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#hero-electric-glow)"
              pathLength={1}
              opacity={trace.opacity ?? 0.7}
              strokeDasharray={trace.dash ?? (kind === 'flow' ? '0.14 0.86' : undefined)}
              style={{ animation }}
            />
          );
        })}
      </svg>

      <span
        className={cn(
          'absolute left-[52%] top-[12%] size-6 -translate-x-1/2 rounded-full',
          'bg-[radial-gradient(circle,rgba(103,232,249,0.12)_0%,transparent_70%)]',
          'animate-[electric-pulse_3.2s_ease-in-out_infinite]',
        )}
      />
      <span
        className={cn(
          'absolute left-[44%] top-[38%] size-5 rounded-full',
          'bg-[radial-gradient(circle,rgba(167,139,250,0.1)_0%,transparent_70%)]',
          'animate-[electric-pulse_3.6s_ease-in-out_1s_infinite]',
        )}
      />
    </div>
  );
}
