/**
 * Lightweight SVG architecture diagram for the About story section.
 * Decorative to sighted users; hidden from assistive tech (paired with prose).
 */
export function AboutStoryArchitectureVisual({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 360 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Layered product architecture: experience, application, and platform layers"
    >
      <rect
        x="24"
        y="28"
        width="312"
        height="224"
        rx="16"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />

      {/* Experience */}
      <rect
        x="48"
        y="48"
        width="264"
        height="56"
        rx="10"
        fill="currentColor"
        fillOpacity="0.06"
        stroke="currentColor"
        strokeOpacity="0.22"
      />
      <text
        x="64"
        y="70"
        fill="currentColor"
        fillOpacity="0.72"
        fontFamily="var(--font-family-sans), system-ui, sans-serif"
        fontSize="12"
        fontWeight="700"
      >
        Experience
      </text>
      <text
        x="64"
        y="88"
        fill="currentColor"
        fillOpacity="0.58"
        fontFamily="var(--font-family-sans), system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
      >
        Next.js · React
      </text>

      {/* Application */}
      <rect
        x="48"
        y="120"
        width="264"
        height="56"
        rx="10"
        fill="currentColor"
        fillOpacity="0.04"
        stroke="currentColor"
        strokeOpacity="0.2"
      />
      <text
        x="64"
        y="142"
        fill="currentColor"
        fillOpacity="0.72"
        fontFamily="var(--font-family-sans), system-ui, sans-serif"
        fontSize="12"
        fontWeight="700"
      >
        Application
      </text>
      <text
        x="64"
        y="160"
        fill="currentColor"
        fillOpacity="0.58"
        fontFamily="var(--font-family-sans), system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
      >
        Node · Express · Python · AI
      </text>

      {/* Platform */}
      <rect
        x="48"
        y="192"
        width="264"
        height="48"
        rx="10"
        fill="currentColor"
        fillOpacity="0.03"
        stroke="currentColor"
        strokeOpacity="0.18"
      />
      <text
        x="64"
        y="212"
        fill="currentColor"
        fillOpacity="0.72"
        fontFamily="var(--font-family-sans), system-ui, sans-serif"
        fontSize="12"
        fontWeight="700"
      >
        Platform
      </text>
      <text
        x="64"
        y="228"
        fill="currentColor"
        fillOpacity="0.58"
        fontFamily="var(--font-family-sans), system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
      >
        Data · Cloud · Observability
      </text>

      <path
        d="M180 104v16M180 176v16"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
