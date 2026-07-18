import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { WORK_CTA_COPY } from "./work.content";
import "./work.css";

/**
 * Final CTA — dark premium conversion band.
 */
export function WorkPageCta() {
  return (
    <Section
      id="work-final-cta"
      spacing="lg"
      aria-labelledby="work-final-cta-heading"
      className="work-cta"
    >
      <div className="work-cta__band">
        <h2 id="work-final-cta-heading" className="work-cta__title">
          {WORK_CTA_COPY.heading}
        </h2>
        <p className="work-cta__description">{WORK_CTA_COPY.description}</p>

        <div className="work-cta__actions">
          <Link
            href={WORK_CTA_COPY.primaryCta.href}
            className="work-cta__primary"
          >
            {WORK_CTA_COPY.primaryCta.label}
            <Icon
              name="arrow-up-right"
              size="sm"
              aria-hidden
              className="h-[14px] w-[14px]"
            />
          </Link>
          <Link
            href={WORK_CTA_COPY.secondaryCta.href}
            className="work-cta__secondary"
          >
            {WORK_CTA_COPY.secondaryCta.label}
          </Link>
        </div>

        <ul className="work-cta__trust" aria-label="Engagement assurances">
          {WORK_CTA_COPY.trust.map((item) => (
            <li key={item}>
              <span className="work-cta__trust-check" aria-hidden>
                <Icon name="check" size="sm" className="h-[14px] w-[14px]" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
