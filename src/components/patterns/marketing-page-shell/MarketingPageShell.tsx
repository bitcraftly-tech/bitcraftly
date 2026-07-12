import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";

interface MarketingPageShellProps {
  title: string;
  description: string;
  headingId: string;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
}

/**
 * Shared placeholder shell for marketing route pages.
 * Keeps layout consistent while route content is built out.
 */
export function MarketingPageShell({
  title,
  description,
  headingId,
  breadcrumbs,
  children,
}: MarketingPageShellProps) {
  return (
    <Section spacing="xl" aria-labelledby={headingId} className="flex-1">
      <Container size="xl" className="max-w-[1280px] px-[32px]">
        {breadcrumbs ? <div className="mb-[var(--space-4)]">{breadcrumbs}</div> : null}
        <Heading id={headingId} level={1} className="max-w-3xl">
          {title}
        </Heading>
        <Text muted className="mt-[var(--space-2)] max-w-2xl">
          {description}
        </Text>
        {children ?? (
          <Text as="p" size="sm" muted className="mt-[var(--space-4)]">
            Page content coming soon.
          </Text>
        )}
      </Container>
    </Section>
  );
}
