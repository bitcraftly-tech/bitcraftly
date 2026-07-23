import Link from "next/link";
import { MarketingFinalCtaBand } from "@/components/patterns/marketing-final-cta-band";
import { PageShell } from "@/components/patterns/marketing-layout";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { NAV_ACTIONS, ROUTES } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { buildBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { TrustHero } from "./TrustHero";
import { TRUST_AREAS, TRUST_LANDING } from "./trust.content";
import "./trust.css";

const focusRing = cn(
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

/**
 * Trust Center — Services-style hero + flat full-width content.
 */
export function TrustCenterLandingPage() {
  const breadcrumbs = buildBreadcrumbs([
    { label: "Home", href: ROUTES.home },
    { label: "Trust Center" },
  ]);

  return (
    <PageShell className="trust-page">
      <TrustHero breadcrumbs={breadcrumbs} />

      <Section
        id="trust-standards"
        spacing="lg"
        aria-labelledby="trust-standards-heading"
        className="trust-page__content border-b border-border/40"
      >
        <Container size="xl">
          <div className="trust-page__prose">
            <header className="trust-page__intro">
              <p className="trust-page__eyebrow">
                {TRUST_LANDING.standardsEyebrow}
              </p>
              <h2
                id="trust-standards-heading"
                className="trust-page__heading"
              >
                {TRUST_LANDING.standardsTitle}
              </h2>
              <p className="trust-page__body">
                {TRUST_LANDING.standardsDescription}
              </p>
            </header>

            {TRUST_AREAS.map((area) => (
              <section
                key={area.id}
                id={area.id}
                className="trust-page__area scroll-mt-24"
                aria-labelledby={`trust-area-${area.id}`}
              >
                <div className="trust-page__area-intro">
                  <h2
                    id={`trust-area-${area.id}`}
                    className="trust-page__heading"
                  >
                    {area.title}
                  </h2>
                  <p className="trust-page__area-count">
                    {area.standards.length}{" "}
                    {area.standards.length === 1 ? "standard" : "standards"}
                  </p>
                </div>

                <div className="trust-page__standards">
                  {area.standards.map((standard) => (
                    <article
                      key={standard.id}
                      className="trust-page__standard"
                      aria-labelledby={`trust-standard-${standard.id}`}
                    >
                      <div className="trust-page__standard-meta">
                        <p className="trust-page__card-code">{standard.code}</p>
                        <span
                          className={cn(
                            "trust-page__badge",
                            standard.status === "approved"
                              ? "trust-page__badge--approved"
                              : "trust-page__badge--prep",
                          )}
                        >
                          {standard.status === "approved"
                            ? "Approved PDF"
                            : "Summary in preparation"}
                        </span>
                      </div>
                      <h3
                        id={`trust-standard-${standard.id}`}
                        className="trust-page__standard-title"
                      >
                        {standard.title}
                      </h3>
                      <p className="trust-page__body">{standard.description}</p>
                      {standard.href && standard.ctaLabel ? (
                        standard.href.startsWith("http") ? (
                          <a
                            href={standard.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("trust-page__card-cta", focusRing)}
                          >
                            {standard.ctaLabel}
                            <Icon
                              name="arrow-up-right"
                              size="sm"
                              aria-hidden
                              className="h-[13px] w-[13px]"
                            />
                          </a>
                        ) : (
                          <Link
                            href={standard.href}
                            className={cn("trust-page__card-cta", focusRing)}
                          >
                            {standard.ctaLabel}
                            <Icon
                              name="arrow-right"
                              size="sm"
                              aria-hidden
                              className="h-[13px] w-[13px]"
                            />
                          </Link>
                        )
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ))}

            <section
              className="trust-page__access"
              aria-labelledby="trust-access-heading"
            >
              <h2 id="trust-access-heading" className="trust-page__heading">
                {TRUST_LANDING.accessTitle}
              </h2>
              <p className="trust-page__body">
                {TRUST_LANDING.accessDescription}
              </p>
              <button
                type="button"
                className="trust-page__btn trust-page__btn--primary"
                disabled
                aria-disabled="true"
              >
                {TRUST_LANDING.accessCta.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </button>
            </section>
          </div>
        </Container>
      </Section>

      <MarketingFinalCtaBand
        headingId="trust-cta-heading"
        heading="Ready to build with confidence?"
        description="Book a free consultation — transparent process, written next steps, and founder-led delivery."
        primaryCta={{
          label: NAV_ACTIONS.freeConsultation.label,
          href: `${ROUTES.contact}?source=trust`,
        }}
        tertiaryCta={{ label: "View privacy policy", href: ROUTES.privacy }}
        trust={[
          "Public standards summaries",
          "Founder-led accountability",
          "Secure modern stack",
        ]}
      />
    </PageShell>
  );
}
