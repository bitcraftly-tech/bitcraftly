import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { NAV_ACTIONS, WORK_PAGE_SECTIONS } from "@/constants/navigation";
import { buildWorkBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { cn } from "@/lib/cn";

export function WorkLandingPage() {
  const breadcrumbs = buildWorkBreadcrumbs();

  return (
    <div className="flex flex-1 flex-col">
      <Section
        spacing="xl"
        aria-labelledby="work-page-heading"
        className="border-b border-border/60"
      >
        <Container size="xl" className="max-w-[1280px] px-[32px]">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-[var(--space-4)]" />
          <Heading id="work-page-heading" level={1} className="max-w-3xl">
            Work
          </Heading>
          <Text muted className="mt-[var(--space-2)] max-w-2xl">
            Explore Bitcraftly projects, case studies, portfolio work, and
            measurable business outcomes across industries.
          </Text>
          <div className="mt-[var(--space-5)] flex flex-wrap gap-[12px]">
            <Link
              href="/work/featured-projects"
              className={cn(
                "inline-flex h-[40px] items-center justify-center rounded-[10px] px-[14px]",
                "bg-gradient-to-r from-primary to-accent text-[13px] font-medium text-primary-foreground no-underline",
              )}
            >
              Featured Projects
            </Link>
            <Link
              href={NAV_ACTIONS.bookCall.href}
              className={cn(
                "inline-flex h-[40px] items-center justify-center rounded-[10px] border border-border px-[14px]",
                "bg-background text-[13px] font-medium text-foreground no-underline hover:bg-surface",
              )}
            >
              {NAV_ACTIONS.bookCall.label}
            </Link>
          </div>
        </Container>
      </Section>

      {WORK_PAGE_SECTIONS.filter((section) => section.id !== "hero").map(
        (section) => (
          <Section
            key={section.id}
            id={section.id}
            spacing="lg"
            aria-labelledby={`${section.id}-heading`}
            className="border-b border-border/40 last:border-b-0"
          >
            <Container size="xl" className="max-w-[1280px] px-[32px]">
              <Heading id={`${section.id}-heading`} level={2}>
                {section.title}
              </Heading>
              <Text muted className="mt-[var(--space-2)] max-w-2xl">
                {section.description}
              </Text>
              <Text as="p" size="sm" muted className="mt-[var(--space-3)]">
                Section content coming soon.
              </Text>
            </Container>
          </Section>
        ),
      )}
    </div>
  );
}
