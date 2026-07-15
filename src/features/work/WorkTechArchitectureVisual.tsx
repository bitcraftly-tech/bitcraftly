/**
 * Decorative architecture diagram — SVG nodes, pipeline, and code preview.
 */
export function WorkTechArchitectureVisual() {
  return (
    <div
      className="work-tech__architecture work-tech__glass"
      aria-hidden="true"
    >
      <div className="work-tech__architecture-head">
        <p className="work-tech__architecture-eyebrow">System map</p>
        <p className="work-tech__architecture-title">Delivery architecture</p>
      </div>

      <svg
        className="work-tech__diagram"
        viewBox="0 0 360 280"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <linearGradient id="work-tech-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="work-tech-node" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in srgb, var(--background) 88%, white)" />
            <stop offset="100%" stopColor="color-mix(in srgb, var(--primary) 8%, var(--background))" />
          </linearGradient>
        </defs>

        {/* API / pipeline connectors */}
        <path
          d="M70 60 H180 V120 H290"
          fill="none"
          stroke="url(#work-tech-line)"
          strokeWidth="2"
          strokeDasharray="5 6"
        />
        <path
          d="M70 140 H180 V200 H290"
          fill="none"
          stroke="url(#work-tech-line)"
          strokeWidth="2"
          strokeDasharray="5 6"
        />
        <path
          d="M180 60 V200"
          fill="none"
          stroke="url(#work-tech-line)"
          strokeWidth="2"
        />

        {/* Cloud nodes */}
        <g>
          <rect x="30" y="36" width="80" height="48" rx="14" fill="url(#work-tech-node)" stroke="color-mix(in srgb, var(--primary) 28%, var(--border))" />
          <text x="70" y="57" textAnchor="middle" className="work-tech__diagram-label">Edge</text>
          <text x="70" y="72" textAnchor="middle" className="work-tech__diagram-sub">CDN · TLS</text>
        </g>
        <g>
          <rect x="140" y="98" width="80" height="48" rx="14" fill="url(#work-tech-node)" stroke="color-mix(in srgb, var(--primary) 28%, var(--border))" />
          <text x="180" y="119" textAnchor="middle" className="work-tech__diagram-label">API</text>
          <text x="180" y="134" textAnchor="middle" className="work-tech__diagram-sub">REST · GQL</text>
        </g>
        <g>
          <rect x="250" y="36" width="80" height="48" rx="14" fill="url(#work-tech-node)" stroke="color-mix(in srgb, var(--accent) 30%, var(--border))" />
          <text x="290" y="57" textAnchor="middle" className="work-tech__diagram-label">App</text>
          <text x="290" y="72" textAnchor="middle" className="work-tech__diagram-sub">Next.js</text>
        </g>
        <g>
          <rect x="250" y="176" width="80" height="48" rx="14" fill="url(#work-tech-node)" stroke="color-mix(in srgb, var(--success) 30%, var(--border))" />
          <text x="290" y="197" textAnchor="middle" className="work-tech__diagram-label">Data</text>
          <text x="290" y="212" textAnchor="middle" className="work-tech__diagram-sub">Postgres</text>
        </g>
        <g>
          <rect x="30" y="176" width="80" height="48" rx="14" fill="url(#work-tech-node)" stroke="color-mix(in srgb, var(--primary) 28%, var(--border))" />
          <text x="70" y="197" textAnchor="middle" className="work-tech__diagram-label">AI</text>
          <text x="70" y="212" textAnchor="middle" className="work-tech__diagram-sub">Assist</text>
        </g>

        {/* Deployment pipeline */}
        <g>
          <rect x="40" y="244" width="280" height="26" rx="13" fill="color-mix(in srgb, var(--primary) 8%, var(--background))" stroke="color-mix(in srgb, var(--primary) 20%, var(--border))" />
          <circle cx="70" cy="257" r="5" fill="var(--primary)" />
          <circle cx="130" cy="257" r="5" fill="var(--primary)" opacity="0.85" />
          <circle cx="190" cy="257" r="5" fill="var(--primary)" opacity="0.7" />
          <circle cx="250" cy="257" r="5" fill="var(--primary)" opacity="0.55" />
          <circle cx="310" cy="257" r="5" fill="var(--accent)" />
          <text x="180" y="250" textAnchor="middle" className="work-tech__diagram-sub">
            Build → Test → Deploy → Observe
          </text>
        </g>
      </svg>

      <pre className="work-tech__code" tabIndex={-1}>
        <code>{`// resilient delivery path
edge → api.gateway
  .auth()
  .route(services)
  .observe()`}</code>
      </pre>
    </div>
  );
}
