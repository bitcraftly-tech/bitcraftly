import type { ReactNode } from "react";
import { Text } from "@/components/ui/typography";
import {
  PageHeader,
  PageShell,
  Section,
  SectionContent,
} from "@/components/patterns/marketing-layout";

interface MarketingPageShellProps {
  title: string;
  description: string;
  headingId: string;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
}

/**
 * Default shell for marketing stub / listing pages.
 * Inherits global Container + section rhythm from the layout system —
 * no per-page max-width or padding.
 */
export function MarketingPageShell({
  title,
  description,
  headingId,
  breadcrumbs,
  children,
}: MarketingPageShellProps) {
  return (
    <PageShell>
      <Section
        spacing="lg"
        aria-labelledby={headingId}
        className="flex-1"
      >
        <SectionContent>
          <PageHeader
            headingId={headingId}
            title={title}
            description={description}
            breadcrumbs={breadcrumbs}
          />
          {children ?? (
            <Text as="p" size="sm" muted className="mt-[var(--space-4)]">
              Page content coming soon.
            </Text>
          )}
        </SectionContent>
      </Section>
    </PageShell>
  );
}
