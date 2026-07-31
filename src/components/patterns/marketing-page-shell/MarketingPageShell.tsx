import type { ReactNode } from 'react';
import Link from 'next/link';
import { Text } from '@/components/ui/typography';
import {
  PageHeader,
  PageShell,
  Section,
  SectionContent,
} from '@/components/patterns/marketing-layout';
import { Icon } from '@/components/ui/icon';
import { NAV_ACTIONS } from '@/constants/navigation';
import { cn } from '@/lib/cn';

interface MarketingPageShellProps {
  title: string;
  description: string;
  headingId: string;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
}

const focusRing = cn(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
);

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
      <Section spacing="lg" aria-labelledby={headingId} className="flex-1">
        <SectionContent>
          <PageHeader
            headingId={headingId}
            title={title}
            description={description}
            breadcrumbs={breadcrumbs}
          />
          {children ?? (
            <div className="mt-[var(--space-4)] grid max-w-xl gap-[16px]">
              <Text as="p" size="sm" muted>
                Detailed page content is being prepared. Meanwhile, talk to the Bitcraftly team —
                we’ll share the right next step for your project.
              </Text>
              <Link
                href={`${NAV_ACTIONS.freeConsultation.href}?source=stub-page`}
                className={cn(
                  'inline-flex h-[40px] w-fit items-center justify-center gap-[8px]',
                  'rounded-[12px] bg-primary px-[16px]',
                  'font-sans text-[14px] font-semibold text-primary-foreground no-underline',
                  'hover:bg-primary/90',
                  focusRing,
                )}
              >
                {NAV_ACTIONS.freeConsultation.label}
                <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
              </Link>
            </div>
          )}
        </SectionContent>
      </Section>
    </PageShell>
  );
}
