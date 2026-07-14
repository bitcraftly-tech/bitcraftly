import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { NAV_ACTIONS } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { industryDetailHref } from "./industries.content";
import type { IndustryModel } from "./industries.types";
import { IndustryIllustration } from "./IndustryIllustration";

/** Featured verticals that should read slightly stronger in the featured rail. */
const PRIORITY_FEATURED = new Set([
  "healthcare",
  "fintech",
  "retail-ecommerce",
]);

interface IndustryCardProps {
  industry: IndustryModel;
  className?: string;
  /** When true, amplify Healthcare / Finance / Retail hierarchy. */
  emphasizePriority?: boolean;
}

/**
 * Industry card — outcomes, size, duration, tech, goals, CTA hierarchy.
 */
export function IndustryCard({
  industry,
  className,
  emphasizePriority = false,
}: IndustryCardProps) {
  const goals = industry.businessGoals.slice(0, 3);
  const isPriority =
    emphasizePriority && PRIORITY_FEATURED.has(industry.slug);

  return (
    <article
      className={cn(
        "industries-card",
        `industries-accent--${industry.accent}`,
        isPriority && "industries-card--priority",
        className,
      )}
    >
      <div className="industries-card__head">
        <IndustryIllustration illustration={industry.illustration} />
        <div className="industries-card__head-text">
          <h3 className="industries-card__title">{industry.label}</h3>
          <p className="industries-card__meta">
            <span>{industry.companySize}</span>
            <span className="industries-card__meta-sep" aria-hidden>
              ·
            </span>
            <span>{industry.projectDuration}</span>
          </p>
        </div>
      </div>

      <p className="industries-card__desc">{industry.description}</p>

      <ul className="industries-card__tags" aria-label={`${industry.label} technologies`}>
        {industry.technologyTags.slice(0, 4).map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <ul
        className="industries-card__highlights"
        aria-label={`${industry.label} business goals`}
      >
        {goals.map((item) => (
          <li key={item}>
            <span className="industries-card__check" aria-hidden>
              <Icon name="check" size="sm" className="h-[11px] w-[11px]" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="industries-card__actions">
        <Link
          href={industryDetailHref(industry.slug)}
          className="industries-card__cta industries-card__cta--primary"
        >
          Explore {industry.label}
          <Icon
            name="arrow-right"
            size="sm"
            aria-hidden
            className="h-[13px] w-[13px]"
          />
        </Link>
        <Link
          href={NAV_ACTIONS.freeConsultation.href}
          className="industries-card__cta industries-card__cta--secondary"
        >
          Talk to us
        </Link>
      </div>
    </article>
  );
}
