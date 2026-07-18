import { Section } from "@/components/ui/section";
import type { AboutTrustedLogo } from "./about.types";

interface AboutTrustedByProps {
  headingId: string;
  eyebrow: string;
  heading: string;
  lede?: string;
  logos: readonly AboutTrustedLogo[];
}

function LogoPlaceholder({ logo }: { logo: AboutTrustedLogo }) {
  const width = Math.max(72, Math.round(logo.mark.length * 10 + 28));

  return (
    <li className="about-trusted__item">
      <span className="about-trusted__mark" role="img" aria-label={logo.label}>
        <svg
          viewBox={`0 0 ${width} 32`}
          fill="none"
          aria-hidden
          className="about-trusted__svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width={width - 1}
            height="31"
            rx="8"
            stroke="currentColor"
            strokeOpacity="0.35"
          />
          <text
            x={width / 2}
            y="21"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="var(--font-family-sans), system-ui, sans-serif"
            fontSize="12"
            fontWeight="600"
            letterSpacing="0.04em"
          >
            {logo.mark}
          </text>
        </svg>
      </span>
    </li>
  );
}

/**
 * Reusable grayscale logo strip — pass approved logos when available.
 * Placeholders keep layout ready without inventing brand marks.
 */
export function AboutTrustedBy({
  headingId,
  eyebrow,
  heading,
  lede,
  logos,
}: AboutTrustedByProps) {
  return (
    <Section
      id="about-trusted-by"
      spacing="lg"
      aria-labelledby={headingId}
      className="border-t border-border/50"
    >
      <header className="mb-[28px] max-w-2xl">
        <p className="about-eyebrow">{eyebrow}</p>
        <h2 id={headingId} className="about-heading">
          {heading}
        </h2>
        {lede ? <p className="about-lede">{lede}</p> : null}
      </header>
      <ul className="about-trusted__list" aria-label="Client logo placeholders">
        {logos.map((logo) => (
          <LogoPlaceholder key={logo.id} logo={logo} />
        ))}
      </ul>
    </Section>
  );
}
