import { MarketingIllustratedHero } from "@/components/patterns/hero-compositions";
import {
  PageShell,
  Section,
  SectionContent,
  SectionHeader,
} from "@/components/patterns/marketing-layout";
import { NAV_ACTIONS, ROUTES, WORK_PAGE_SECTIONS } from "@/constants/navigation";
import { buildWorkBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { WorkHeroVisual } from "./WorkHeroVisual";

export function WorkLandingPage() {
  const breadcrumbs = buildWorkBreadcrumbs();

  return (
    <PageShell>
      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId="work-page-heading"
        eyebrow="Our work"
        title="Portfolio, case studies, and outcomes that prove the craft"
        titleHighlight="outcomes"
        description="Explore Bitcraftly projects across industries — product builds, websites, and enterprise systems with measurable results."
        supporting="Browse featured work, case studies, and delivery notes before we scope your next build."
        primaryCta={{
          label: "Featured projects",
          href: "/work/featured-projects",
        }}
        secondaryCta={{
          label: NAV_ACTIONS.bookCall.label,
          href: NAV_ACTIONS.bookCall.href,
        }}
        trustItems={[
          "Real client outcomes",
          "Cross-industry delivery",
          "Founder-led quality",
        ]}
        visual={<WorkHeroVisual />}
      />

      {WORK_PAGE_SECTIONS.filter((section) => section.id !== "hero").map(
        (section) => (
          <Section
            key={section.id}
            id={section.id}
            spacing="lg"
            aria-labelledby={`${section.id}-heading`}
            className="border-b border-border/40 last:border-b-0"
          >
            <SectionContent>
              <SectionHeader
                id={`${section.id}-heading`}
                title={section.title}
                description={section.description}
              />
              <p className="mt-[var(--space-3)] m-0 font-sans text-[13px] text-muted-foreground">
                Section content coming soon.
              </p>
            </SectionContent>
          </Section>
        ),
      )}
    </PageShell>
  );
}

export const WORK_LANDING_META = {
  path: ROUTES.work,
} as const;
