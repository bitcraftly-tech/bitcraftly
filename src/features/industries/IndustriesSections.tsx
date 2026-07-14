import Link from "next/link";
import { AnimatedStat } from "@/components/patterns/animated-stat";
import { FaqAccordion } from "@/components/patterns/faq-accordion";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { PAGE_GRID_CLASS, PAGE_GRID_4_CLASS } from "@/lib/layout/page-shell";
import { cn } from "@/lib/cn";
import "@/features/homepage/FAQ/faq.css";
import {
  INDUSTRIES_CATALOG,
  INDUSTRIES_LANDING,
  INDUSTRY_CASE_STUDIES,
  INDUSTRY_CHALLENGES,
  INDUSTRY_COMPARISON,
  INDUSTRY_FAQS,
  INDUSTRY_PROCESS,
  INDUSTRY_PROOF,
  INDUSTRY_RELATED_SERVICES,
  INDUSTRY_ROI,
  INDUSTRY_SOLUTION_OFFERS,
  INDUSTRY_TECH_GROUPS,
  INDUSTRY_WHY,
} from "./industries.content";
import { IndustryCard } from "./IndustryCard";

function SectionIntro({
  eyebrow,
  headingId,
  heading,
  description,
}: {
  eyebrow: string;
  headingId: string;
  heading: string;
  description: string;
}) {
  return (
    <div className="mb-[40px] max-w-2xl">
      <p className="industries-intro__eyebrow">{eyebrow}</p>
      <h2 id={headingId} className="industries-intro__heading">
        {heading}
      </h2>
      <p className="industries-intro__description">{description}</p>
    </div>
  );
}

export function IndustriesFeaturedSection() {
  const featured = INDUSTRIES_CATALOG.filter((item) => item.featured);

  return (
    <Section
      spacing="lg"
      background="surface"
      aria-labelledby="industries-featured-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="Featured"
        headingId="industries-featured-heading"
        heading={INDUSTRIES_LANDING.featuredHeading}
        description={INDUSTRIES_LANDING.featuredDescription}
      />
      <ul className={cn("m-0 list-none p-0 industries-featured-rail")}>
        {featured.map((industry) => (
          <li key={industry.slug} className="min-w-0 h-full">
            <IndustryCard industry={industry} emphasizePriority />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function IndustriesGridSection() {
  return (
    <Section
      id="industries-grid"
      spacing="lg"
      aria-labelledby="industries-grid-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="Catalog"
        headingId="industries-grid-heading"
        heading={INDUSTRIES_LANDING.gridHeading}
        description={INDUSTRIES_LANDING.gridDescription}
      />
      <ul className={cn("m-0 list-none p-0 grid gap-[20px]", PAGE_GRID_CLASS, "lg:grid-cols-3")}>
        {INDUSTRIES_CATALOG.map((industry) => (
          <li key={industry.slug} className="min-w-0 h-full">
            <IndustryCard industry={industry} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function IndustriesProofSection() {
  return (
    <Section
      spacing="lg"
      background="surface"
      aria-labelledby="industries-proof-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="Industry proof"
        headingId="industries-proof-heading"
        heading={INDUSTRIES_LANDING.proofHeading}
        description={INDUSTRIES_LANDING.proofDescription}
      />
      <ul className="industries-proof">
        {INDUSTRY_PROOF.map((item) => (
          <li
            key={item.id}
            className={cn("industries-proof__card", `industries-proof__card--${item.tone}`)}
          >
            <span className="industries-proof__icon" aria-hidden>
              <Icon name={item.icon} size="sm" className="h-[18px] w-[18px]" />
            </span>
            <div className="industries-proof__body">
              <h3 className="industries-proof__title">{item.industry}</h3>
              <p className="industries-proof__outcome">{item.outcome}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function IndustriesChallengesSection() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="industries-challenges-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="Challenges"
        headingId="industries-challenges-heading"
        heading={INDUSTRIES_LANDING.challengesHeading}
        description={INDUSTRIES_LANDING.challengesDescription}
      />
      <ul className="industries-challenges">
        {INDUSTRY_CHALLENGES.map((challenge) => (
          <li
            key={challenge.id}
            className={cn(
              "industries-challenge",
              `industries-challenge--${challenge.tone}`,
            )}
          >
            <span className="industries-challenge__badge">Challenge</span>
            <div className="industries-challenge__head">
              <span className="industries-challenge__icon" aria-hidden>
                <Icon name={challenge.icon} size="sm" className="h-[18px] w-[18px]" />
              </span>
              <h3 className="industries-challenge__title">{challenge.title}</h3>
            </div>
            <dl className="industries-challenge__grid">
              <div>
                <dt>Problem</dt>
                <dd>{challenge.problem}</dd>
              </div>
              <div>
                <dt>Impact</dt>
                <dd>{challenge.impact}</dd>
              </div>
              <div>
                <dt>Bitcraftly approach</dt>
                <dd>{challenge.approach}</dd>
              </div>
              <div>
                <dt>Expected outcome</dt>
                <dd>{challenge.outcome}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function IndustriesSolutionsSection() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="industries-solutions-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="Solutions"
        headingId="industries-solutions-heading"
        heading={INDUSTRIES_LANDING.solutionsHeading}
        description={INDUSTRIES_LANDING.solutionsDescription}
      />
      <ul className="industries-solutions">
        {INDUSTRY_SOLUTION_OFFERS.map((offer) => (
          <li key={offer.id}>
            <article
              className={cn(
                "industries-solution",
                `industries-solution--${offer.tone}`,
              )}
            >
              <div className="industries-solution__head">
                <span className="industries-solution__icon" aria-hidden>
                  <Icon name={offer.icon} size="sm" className="h-[18px] w-[18px]" />
                </span>
                <h3 className="industries-solution__title">{offer.title}</h3>
              </div>
              <p className="industries-solution__desc">{offer.description}</p>

              <dl className="industries-solution__meta">
                <div>
                  <dt>Recommended services</dt>
                  <dd>{offer.recommendedServices.join(" · ")}</dd>
                </div>
                <div>
                  <dt>Technology stack</dt>
                  <dd>{offer.technologyStack.join(" · ")}</dd>
                </div>
                <div>
                  <dt>Delivery model</dt>
                  <dd>{offer.deliveryModel}</dd>
                </div>
                <div>
                  <dt>Typical timeline</dt>
                  <dd>{offer.typicalTimeline}</dd>
                </div>
              </dl>

              <Link href={offer.href} className="industries-solution__cta">
                {offer.ctaLabel}
                <Icon
                  name="arrow-right"
                  size="sm"
                  aria-hidden
                  className="h-[13px] w-[13px]"
                />
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function IndustriesTechSection() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="industries-tech-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="Stack"
        headingId="industries-tech-heading"
        heading={INDUSTRIES_LANDING.techHeading}
        description={INDUSTRIES_LANDING.techDescription}
      />

      <ul
        className="industries-tech-groups"
        aria-label="Technology stack by category"
      >
        {INDUSTRY_TECH_GROUPS.map((group) => (
          <li
            key={group.id}
            className={cn(
              "industries-tech-group",
              `industries-tech-group--${group.tone}`,
            )}
          >
            <div className="industries-tech-group__head">
              <span className="industries-tech-group__icon" aria-hidden>
                <Icon name={group.icon} size="sm" className="h-[18px] w-[18px]" />
              </span>
              <h3 className="industries-tech-group__title">{group.category}</h3>
            </div>
            <ul className="industries-tech-group__items">
              {group.items.map((tech) => (
                <li key={tech.name}>
                  <Icon
                    name={tech.icon}
                    size="sm"
                    aria-hidden
                    className="h-[12px] w-[12px]"
                  />
                  {tech.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function IndustriesCaseStudiesSection() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="industries-cases-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="Case studies"
        headingId="industries-cases-heading"
        heading={INDUSTRIES_LANDING.casesHeading}
        description={INDUSTRIES_LANDING.casesDescription}
      />
      <ul className="industries-cases">
        {INDUSTRY_CASE_STUDIES.map((study) => (
          <li key={study.id}>
            <article
              className={cn(
                "industries-case",
                `industries-case--${study.tone}`,
              )}
            >
              <div className="industries-case__metric-panel">
                <div className="industries-case__metric-row">
                  <p className="industries-case__metric">{study.metric}</p>
                  <span className="industries-case__trend" aria-hidden>
                    <svg viewBox="0 0 48 20" className="industries-case__spark">
                      <polyline
                        points="0,16 10,12 18,14 28,6 38,8 48,2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <p className="industries-case__metric-label">{study.metricLabel}</p>
              </div>

              <div className="industries-case__body">
                <div className="industries-case__meta">
                  <span className="industries-case__badge">
                    <Icon
                      name={study.icon}
                      size="sm"
                      aria-hidden
                      className="h-[12px] w-[12px]"
                    />
                    {study.industry}
                  </span>
                  <span className="industries-case__client">{study.clientType}</span>
                </div>

                <dl className="industries-case__facts">
                  <div>
                    <dt>Problem</dt>
                    <dd>{study.problem}</dd>
                  </div>
                  <div>
                    <dt>Solution</dt>
                    <dd>{study.solution}</dd>
                  </div>
                  <div>
                    <dt>Outcome</dt>
                    <dd>{study.outcome}</dd>
                  </div>
                </dl>

                <Link href={study.href} className="industries-case__cta">
                  {study.ctaLabel}
                  <Icon
                    name="arrow-right"
                    size="sm"
                    aria-hidden
                    className="h-[13px] w-[13px]"
                  />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** ROI / business outcomes — premium KPI cards. */
export function IndustriesMetricsSection() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="industries-metrics-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="ROI"
        headingId="industries-metrics-heading"
        heading={INDUSTRIES_LANDING.metricsHeading}
        description={INDUSTRIES_LANDING.metricsDescription}
      />
      <ul className="industries-roi">
        {INDUSTRY_ROI.map((item) => (
          <li
            key={item.id}
            className={cn(
              "industries-roi__card",
              `industries-roi__card--${item.tone}`,
            )}
          >
            <div className="industries-roi__head">
              <span className="industries-roi__icon" aria-hidden>
                <Icon name={item.icon} size="sm" className="h-[18px] w-[18px]" />
              </span>
              <p className="industries-roi__value">
                <AnimatedStat value={item.value} />
              </p>
            </div>
            <h3 className="industries-roi__title">{item.title}</h3>
            <p className="industries-roi__example">{item.example}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function IndustriesProcessSection() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="industries-process-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="Process"
        headingId="industries-process-heading"
        heading={INDUSTRIES_LANDING.processHeading}
        description={INDUSTRIES_LANDING.processDescription}
      />
      <ol className="industries-process">
        {INDUSTRY_PROCESS.map((step, index) => (
          <li
            key={step.id}
            className={cn(
              "industries-process__step",
              `industries-process__step--${step.tone}`,
            )}
            data-step={index + 1}
          >
            <span className="industries-process__watermark" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="industries-process__top">
              <span className="industries-process__icon" aria-hidden>
                <Icon name={step.icon} size="sm" className="h-[18px] w-[18px]" />
              </span>
              <p className="industries-process__index">
                Step {String(index + 1).padStart(2, "0")}
              </p>
            </div>

            <h3 className="industries-process__title">{step.title}</h3>
            <p className="industries-process__desc">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function IndustriesComparisonSection() {
  return (
    <Section
      spacing="lg"
      background="surface"
      aria-labelledby="industries-comparison-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="Comparison"
        headingId="industries-comparison-heading"
        heading={INDUSTRIES_LANDING.comparisonHeading}
        description={INDUSTRIES_LANDING.comparisonDescription}
      />
      <div className="industries-compare">
        <table className="industries-compare__table">
          <caption className="sr-only">
            Generic agency versus Bitcraftly industry engineering
          </caption>
          <thead>
            <tr>
              <th scope="col">Criterion</th>
              <th scope="col">Generic Agency</th>
              <th scope="col">Bitcraftly</th>
            </tr>
          </thead>
          <tbody>
            {INDUSTRY_COMPARISON.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.criterion}</th>
                <td>
                  <span className="industries-compare__cell">
                    <Icon
                      name="x"
                      size="sm"
                      aria-hidden
                      className="industries-compare__icon industries-compare__icon--cross"
                    />
                    <span>{row.generic}</span>
                  </span>
                </td>
                <td className="industries-compare__win">
                  <span className="industries-compare__cell">
                    <Icon
                      name="check"
                      size="sm"
                      aria-hidden
                      className="industries-compare__icon industries-compare__icon--tick"
                    />
                    <span>{row.bitcraftly}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

export function IndustriesWhySection() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="industries-why-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="Why Bitcraftly"
        headingId="industries-why-heading"
        heading={INDUSTRIES_LANDING.whyHeading}
        description={INDUSTRIES_LANDING.whyDescription}
      />
      <ul className="industries-why">
        {INDUSTRY_WHY.map((item) => (
          <li
            key={item.id}
            className={cn(
              "industries-why__card",
              `industries-why__card--${item.tone}`,
            )}
          >
            <div className="industries-why__head">
              <span className="industries-why__icon" aria-hidden>
                <Icon name={item.icon} size="sm" className="h-[18px] w-[18px]" />
              </span>
              <h3 className="industries-why__title">{item.title}</h3>
            </div>
            <p className="industries-why__desc">{item.description}</p>
            <p className="industries-why__metric">{item.metric}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function IndustriesFaqSection() {
  return (
    <Section
      spacing="lg"
      background="default"
      aria-labelledby="industries-faq-heading"
      className="industries-faq-section border-b border-border/40 bg-background text-foreground"
    >
      <SectionIntro
        eyebrow="FAQ"
        headingId="industries-faq-heading"
        heading={INDUSTRIES_LANDING.faqHeading}
        description={INDUSTRIES_LANDING.faqDescription}
      />
      <FaqAccordion items={[...INDUSTRY_FAQS]} />
    </Section>
  );
}

export function IndustriesRelatedServicesSection() {
  return (
    <Section
      spacing="lg"
      background="surface"
      aria-labelledby="industries-related-heading"
      className="border-b border-border/40"
    >
      <SectionIntro
        eyebrow="Services"
        headingId="industries-related-heading"
        heading={INDUSTRIES_LANDING.relatedHeading}
        description={INDUSTRIES_LANDING.relatedDescription}
      />
      <ul className={cn("m-0 list-none p-0 grid gap-[16px]", PAGE_GRID_4_CLASS)}>
        {INDUSTRY_RELATED_SERVICES.map((service) => (
          <li key={service.id} className="min-w-0 h-full">
            <Link href={service.href} className="industries-offer">
              <div className="industries-offer__head">
                <span className="industries-offer__icon" aria-hidden>
                  <Icon
                    name={service.icon}
                    size="sm"
                    className="h-[18px] w-[18px]"
                  />
                </span>
                <h3 className="industries-offer__title">{service.title}</h3>
              </div>
              <p className="industries-offer__desc">{service.description}</p>
              <p className="industries-offer__count">
                Used across {service.relatedIndustryCount}+ industries
              </p>
              <span className="industries-offer__cta">
                {service.ctaLabel}
                <Icon
                  name="arrow-right"
                  size="sm"
                  aria-hidden
                  className="h-[13px] w-[13px]"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
