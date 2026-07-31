import '@/styles/route-loading.css';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { FormSkeleton, HeroLoadingSkeleton } from '@/components/patterns/skeletons';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';

export default async function ContactLoading() {
  const compact = await isMobileUserAgent();

  return (
    <div aria-live="polite">
      <HeroLoadingSkeleton compact={compact} />
      <Section spacing="lg">
        <Container size="md">
          <FormSkeleton />
        </Container>
      </Section>
    </div>
  );
}
