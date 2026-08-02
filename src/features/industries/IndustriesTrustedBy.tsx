import type { ReactNode } from 'react';
import { INDUSTRIES_LANDING } from './industries.content';

type BrandId = (typeof INDUSTRIES_LANDING.trustedBy.brands)[number]['id'];

function BrandMark({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="industries-trusted__mark" role="img" aria-label={label}>
      {children}
    </span>
  );
}

function TextWordmark({
  label,
  text,
  fontSize = 14,
  tracking = '0',
  weight = 700,
}: {
  label: string;
  text: string;
  fontSize?: number;
  tracking?: string;
  weight?: number;
}) {
  const width = Math.max(72, Math.round(text.length * fontSize * 0.62));
  return (
    <BrandMark label={label}>
      <svg viewBox={`0 0 ${width} 28`} fill="none" aria-hidden className="industries-trusted__svg">
        <text
          x="0"
          y="19"
          fill="currentColor"
          fontFamily="var(--font-family-sans), system-ui, sans-serif"
          fontSize={fontSize}
          fontWeight={weight}
          letterSpacing={tracking}
        >
          {text}
        </text>
      </svg>
    </BrandMark>
  );
}

const BRAND_MARKS: Record<BrandId, ReactNode> = {
  medanta: (
    <BrandMark label="Medanta">
      <svg viewBox="0 0 132 28" fill="none" aria-hidden className="industries-trusted__svg">
        <path d="M14 5v18M8 14h12" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        <text
          x="30"
          y="19"
          fill="currentColor"
          fontFamily="var(--font-family-sans), system-ui, sans-serif"
          fontSize="15"
          fontWeight="700"
          letterSpacing="-0.02em"
        >
          Medanta
        </text>
      </svg>
    </BrandMark>
  ),
  byjus: (
    <BrandMark label="BYJU'S">
      <svg viewBox="0 0 118 28" fill="none" aria-hidden className="industries-trusted__svg">
        <rect x="1" y="3" width="22" height="22" rx="5" fill="currentColor" />
        <text
          x="12"
          y="19"
          textAnchor="middle"
          fill="var(--background)"
          fontFamily="var(--font-family-sans), system-ui, sans-serif"
          fontSize="13"
          fontWeight="800"
        >
          B
        </text>
        <text
          x="30"
          y="19"
          fill="currentColor"
          fontFamily="var(--font-family-sans), system-ui, sans-serif"
          fontSize="14"
          fontWeight="800"
          letterSpacing="0.04em"
        >
          {"BYJU'S"}
        </text>
      </svg>
    </BrandMark>
  ),
  tata: (
    <BrandMark label="TATA">
      <svg viewBox="0 0 96 28" fill="none" aria-hidden className="industries-trusted__svg">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="14" cy="14" r="4.2" fill="currentColor" />
        <path
          d="M14 5.5v3.2M14 19.3v3.2M5.5 14h3.2M19.3 14h3.2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <text
          x="32"
          y="19"
          fill="currentColor"
          fontFamily="var(--font-family-sans), system-ui, sans-serif"
          fontSize="15"
          fontWeight="700"
          letterSpacing="0.12em"
        >
          TATA
        </text>
      </svg>
    </BrandMark>
  ),
  zepto: <TextWordmark label="Zepto" text="zepto" fontSize={18} tracking="-0.03em" />,
  reliance: (
    <BrandMark label="Reliance Industries Limited">
      <svg viewBox="0 0 148 28" fill="none" aria-hidden className="industries-trusted__svg">
        <path
          d="M12 3.5c1.9 3.6 4.1 6.2 6.7 7.8C16 13.5 13.7 16.6 12 22.5c-1.7-5.9-4-9-6.7-11.2C7.9 9.7 10.1 7.1 12 3.5Z"
          fill="currentColor"
        />
        <text
          x="28"
          y="12"
          fill="currentColor"
          fontFamily="var(--font-family-sans), system-ui, sans-serif"
          fontSize="12"
          fontWeight="700"
        >
          Reliance
        </text>
        <text
          x="28"
          y="23"
          fill="currentColor"
          fontFamily="var(--font-family-sans), system-ui, sans-serif"
          fontSize="8"
          fontWeight="600"
          letterSpacing="0.02em"
        >
          Industries Limited
        </text>
      </svg>
    </BrandMark>
  ),
  delhivery: (
    <TextWordmark label="Delhivery" text="DELHIVERY" fontSize={13} tracking="0.08em" weight={800} />
  ),
  apollo: <TextWordmark label="Apollo" text="Apollo" fontSize={15} weight={700} />,
  hdfc: <TextWordmark label="HDFC Bank" text="HDFC Bank" fontSize={14} weight={700} />,
  infosys: <TextWordmark label="Infosys" text="Infosys" fontSize={15} weight={700} />,
  swiggy: <TextWordmark label="Swiggy" text="Swiggy" fontSize={15} weight={700} />,
  nestle: <TextWordmark label="Nestlé" text="Nestlé" fontSize={15} weight={700} />,
  pharmeasy: <TextWordmark label="PharmEasy" text="PharmEasy" fontSize={14} weight={700} />,
};

/**
 * Hero social-proof strip — label + infinite brand marquee.
 */
export function IndustriesTrustedBy() {
  const { label, brands } = INDUSTRIES_LANDING.trustedBy;
  const loop = [...brands, ...brands];

  return (
    <div className="industries-hero__trusted relative">
      <p className="industries-hero__trusted-label">{label}</p>
      <div className="industries-hero__trusted-divider" aria-hidden />

      <div className="industries-hero__trusted-marquee" aria-label="Client brands">
        <div className="industries-hero__trusted-track">
          {loop.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="industries-hero__trusted-item"
              aria-hidden={index >= brands.length}
            >
              {BRAND_MARKS[brand.id]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
