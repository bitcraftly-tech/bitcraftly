/**
 * Hero atmosphere matched to target:
 * near-white wash, soft cyan glow, sparse blueprint / robotic edge texture,
 * with subtle traveling electric current along the traces.
 */
export function AiStudioHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Near-white vertical wash */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f4f7fb_0%,#f8fafc_38%,#fcfdfe_72%,#ffffff_100%)]" />

      {/* Soft ambient glows — kept subtle so they do not read as a sky wash behind the robot. */}
      <div className="motion-glow-pulse absolute right-[-8%] top-[-12%] h-[78%] w-[62%] rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.035)_0%,rgba(226,232,240,0.02)_42%,transparent_70%)] blur-[48px]" />
      <div className="motion-glow-pulse absolute right-[18%] top-[8%] h-[48%] w-[34%] rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.03)_0%,transparent_68%)] blur-[56px] [animation-delay:1.2s]" />
      <div className="motion-glow-pulse absolute bottom-[12%] left-[6%] h-[38%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(186,230,253,0.03)_0%,transparent_70%)] blur-[64px] [animation-delay:2.4s]" />
      <div className="motion-glow-pulse absolute left-[35%] top-[35%] h-[28%] w-[28%] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.025)_0%,transparent_70%)] blur-[60px] [animation-delay:0.6s]" />

      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="bg-electric-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="bg-electric-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="45%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>

        <g stroke="#9db4cb" strokeWidth="1" fill="none" strokeLinecap="square">
          {/* Left mechanical rail / notched panel */}
          <path d="M18 40 V860" opacity="0.35" />
          <path d="M18 110 H34 V150 H18" opacity="0.4" />
          <path d="M18 260 H28 V300 H18" opacity="0.32" />
          <path d="M18 420 H34 V470 H18" opacity="0.38" />
          <path d="M18 620 H28 V670 H18" opacity="0.3" />
          <path
            d="M34 40 V100 M34 160 V250 M34 310 V410 M34 480 V610 M34 680 V860"
            opacity="0.22"
          />

          {/* Right mechanical rail */}
          <path d="M1422 40 V860" opacity="0.32" />
          <path d="M1422 90 H1406 V140 H1422" opacity="0.36" />
          <path d="M1422 300 H1412 V350 H1422" opacity="0.28" />
          <path d="M1422 520 H1406 V580 H1422" opacity="0.34" />
          <path d="M1406 40 V80 M1406 150 V290 M1406 360 V510 M1406 590 V860" opacity="0.2" />

          {/* Top-left HUD cluster */}
          <path d="M56 56 H110 M56 56 V108" opacity="0.42" />
          <path d="M72 78 H150 V120 H210" opacity="0.28" />
          <path d="M90 140 H160" strokeDasharray="4 5" opacity="0.3" />
          <path d="M56 180 H100 V230" opacity="0.26" />

          {/* Mid-left blueprint accents */}
          <path d="M70 340 H150 V390 H210" opacity="0.26" />
          <path d="M90 420 L130 460 H190" opacity="0.22" />
          <path d="M60 500 H140" strokeDasharray="3 4" opacity="0.28" />
          <path d="M80 540 H160 V590" opacity="0.24" />

          {/* Bottom-left tech cluster (target-heavy area) */}
          <path d="M48 720 H140 V780 H220" opacity="0.34" />
          <path d="M70 700 L110 740 H180 L210 770" opacity="0.26" />
          <path d="M100 760 H190" strokeDasharray="4 4" opacity="0.3" />
          <path d="M56 800 H130 V840" opacity="0.28" />
          <path d="M150 820 H240" opacity="0.22" />
          <path d="M48 850 H280" opacity="0.2" />

          {/* Top-right accents */}
          <path d="M1320 56 H1384 M1384 56 V110" opacity="0.38" />
          <path d="M1240 80 H1330 V130" opacity="0.24" />
          <path d="M1280 150 H1360" strokeDasharray="4 5" opacity="0.26" />

          {/* Behind-robot sparse traces */}
          <path d="M560 180 H640 V240" opacity="0.18" />
          <path d="M600 280 H680 V340 H740" opacity="0.16" />
          <path d="M520 400 H600" strokeDasharray="3 5" opacity="0.16" />
          <path d="M640 460 H720 V520" opacity="0.15" />

          {/* Right mid accents near dashboard */}
          <path d="M1180 220 H1280 V280" opacity="0.22" />
          <path d="M1220 340 H1320" strokeDasharray="4 4" opacity="0.2" />
          <path d="M1160 480 H1260 V540 H1340" opacity="0.22" />
          <path d="M1200 620 H1300 V680" opacity="0.2" />
        </g>

        {/* Plus marks */}
        <g stroke="#8fa6bd" strokeWidth="1.15" strokeLinecap="round" opacity="0.4">
          <path d="M110 56 h9 M114.5 51.5 v9" />
          <path d="M150 120 h8 M154 116 v8" />
          <path d="M140 780 h8 M144 776 v8" />
          <path d="M210 770 h7 M213.5 766.5 v7" />
          <path d="M1320 56 h9 M1324.5 51.5 v9" />
          <path d="M1280 280 h7 M1283.5 276.5 v7" />
          <path d="M1260 540 h7 M1263.5 536.5 v7" />
          <path d="M640 240 h7 M643.5 236.5 v7" />
        </g>

        {/* Tiny nodes */}
        <g fill="#8fa6bd" opacity="0.38">
          <circle cx="110" cy="56" r="1.5" />
          <circle cx="150" cy="120" r="1.4" />
          <circle cx="140" cy="780" r="1.5" />
          <circle cx="210" cy="770" r="1.3" />
          <circle cx="220" cy="780" r="1.2" />
          <circle cx="1320" cy="56" r="1.5" />
          <circle cx="1280" cy="280" r="1.3" />
          <circle cx="1260" cy="540" r="1.3" />
          <circle cx="640" cy="240" r="1.2" />
          <circle cx="180" cy="460" r="1.2" />
          <circle cx="190" cy="500" r="1.1" />
        </g>

        {/* Sparse micro-dot clusters */}
        <g fill="#a8bdd1" opacity="0.28">
          <circle cx="86" cy="200" r="0.9" />
          <circle cx="98" cy="212" r="0.9" />
          <circle cx="110" cy="200" r="0.9" />
          <circle cx="98" cy="224" r="0.9" />
          <circle cx="1240" cy="200" r="0.9" />
          <circle cx="1252" cy="212" r="0.9" />
          <circle cx="1264" cy="200" r="0.9" />
          <circle cx="96" cy="690" r="0.9" />
          <circle cx="108" cy="702" r="0.9" />
          <circle cx="120" cy="690" r="0.9" />
        </g>

        {/* Electric current traveling along key traces */}
        <g
          className="motion-reduce:hidden"
          fill="none"
          stroke="url(#bg-electric-grad)"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#bg-electric-glow)"
        >
          {/* Left rail — current runs top → bottom */}
          <path
            d="M18 40 V860"
            strokeWidth="1.6"
            pathLength={1}
            strokeDasharray="0.12 0.88"
            className="animate-[circuit-current_3.2s_linear_infinite]"
          />
          {/* Left rail notches spark */}
          <path
            d="M18 110 H34 V150 H18"
            strokeWidth="1.35"
            pathLength={1}
            strokeDasharray="0.35 0.65"
            className="animate-[circuit-current_2.6s_ease-in-out_0.4s_infinite]"
          />
          <path
            d="M18 420 H34 V470 H18"
            strokeWidth="1.35"
            pathLength={1}
            strokeDasharray="0.35 0.65"
            className="animate-[circuit-current_2.8s_ease-in-out_1.2s_infinite]"
          />

          {/* Top-left HUD current */}
          <path
            d="M56 56 H110 M56 56 V108"
            strokeWidth="1.5"
            pathLength={1}
            strokeDasharray="0.28 0.72"
            className="animate-[circuit-current_2.4s_ease-in-out_infinite]"
          />
          <path
            d="M72 78 H150 V120 H210"
            strokeWidth="1.3"
            pathLength={1}
            strokeDasharray="0.22 0.78"
            className="animate-[circuit-current_3s_ease-in-out_0.6s_infinite]"
          />

          {/* Mid-left traces */}
          <path
            d="M70 340 H150 V390 H210"
            strokeWidth="1.25"
            pathLength={1}
            strokeDasharray="0.2 0.8"
            className="animate-[circuit-current_2.9s_ease-in-out_1s_infinite]"
          />
          <path
            d="M90 420 L130 460 H190"
            strokeWidth="1.2"
            pathLength={1}
            strokeDasharray="0.25 0.75"
            className="animate-[circuit-current_2.5s_ease-in-out_0.3s_infinite]"
          />

          {/* Bottom-left tech cluster */}
          <path
            d="M48 720 H140 V780 H220"
            strokeWidth="1.4"
            pathLength={1}
            strokeDasharray="0.2 0.8"
            className="animate-[circuit-current_3.1s_ease-in-out_0.8s_infinite]"
          />
          <path
            d="M70 700 L110 740 H180 L210 770"
            strokeWidth="1.25"
            pathLength={1}
            strokeDasharray="0.22 0.78"
            className="animate-[circuit-current_2.7s_ease-in-out_1.4s_infinite]"
          />

          {/* Right rail */}
          <path
            d="M1422 40 V860"
            strokeWidth="1.5"
            pathLength={1}
            strokeDasharray="0.1 0.9"
            className="animate-[circuit-current_3.6s_linear_0.5s_infinite]"
          />
          <path
            d="M1422 90 H1406 V140 H1422"
            strokeWidth="1.3"
            pathLength={1}
            strokeDasharray="0.35 0.65"
            className="animate-[circuit-current_2.5s_ease-in-out_0.9s_infinite]"
          />

          {/* Top-right */}
          <path
            d="M1320 56 H1384 M1384 56 V110"
            strokeWidth="1.4"
            pathLength={1}
            strokeDasharray="0.3 0.7"
            className="animate-[circuit-current_2.6s_ease-in-out_0.2s_infinite]"
          />

          {/* Behind robot / mid */}
          <path
            d="M600 280 H680 V340 H740"
            strokeWidth="1.2"
            pathLength={1}
            strokeDasharray="0.2 0.8"
            className="animate-[circuit-current_3.4s_ease-in-out_1.1s_infinite]"
          />
          <path
            d="M640 460 H720 V520"
            strokeWidth="1.15"
            pathLength={1}
            strokeDasharray="0.25 0.75"
            className="animate-[circuit-current_2.8s_ease-in-out_1.6s_infinite]"
          />

          {/* Right mid near dashboard */}
          <path
            d="M1180 220 H1280 V280"
            strokeWidth="1.25"
            pathLength={1}
            strokeDasharray="0.22 0.78"
            className="animate-[circuit-current_2.9s_ease-in-out_0.7s_infinite]"
          />
          <path
            d="M1160 480 H1260 V540 H1340"
            strokeWidth="1.3"
            pathLength={1}
            strokeDasharray="0.18 0.82"
            className="animate-[circuit-current_3.2s_ease-in-out_1.3s_infinite]"
          />
        </g>

        {/* Live nodes that pulse when current hits */}
        <g className="motion-reduce:hidden" fill="#67e8f9" filter="url(#bg-electric-glow)">
          <circle
            cx="110"
            cy="56"
            r="2.2"
            className="animate-[circuit-node-pulse_2.4s_ease-in-out_infinite]"
          />
          <circle
            cx="210"
            cy="120"
            r="2"
            className="animate-[circuit-node-pulse_3s_ease-in-out_0.6s_infinite]"
          />
          <circle
            cx="210"
            cy="390"
            r="1.9"
            className="animate-[circuit-node-pulse_2.9s_ease-in-out_1s_infinite]"
          />
          <circle
            cx="220"
            cy="780"
            r="2.1"
            className="animate-[circuit-node-pulse_3.1s_ease-in-out_0.8s_infinite]"
          />
          <circle
            cx="1320"
            cy="56"
            r="2.1"
            className="animate-[circuit-node-pulse_2.6s_ease-in-out_0.2s_infinite]"
          />
          <circle
            cx="1280"
            cy="280"
            r="1.9"
            className="animate-[circuit-node-pulse_2.9s_ease-in-out_0.7s_infinite]"
          />
          <circle
            cx="1340"
            cy="540"
            r="2"
            className="animate-[circuit-node-pulse_3.2s_ease-in-out_1.3s_infinite]"
          />
          <circle
            cx="740"
            cy="340"
            r="1.8"
            className="animate-[circuit-node-pulse_3.4s_ease-in-out_1.1s_infinite]"
          />
        </g>
      </svg>
    </div>
  );
}
