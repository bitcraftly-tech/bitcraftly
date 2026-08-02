import { FaqAccordionLazy } from './FaqAccordionLazy';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/cn';
import { HomepageReveal } from '../shared/HomepageReveal';
import {
  FAQ_DESCRIPTION,
  FAQ_HEADING,
  FAQ_HEADING_ID,
  FAQ_ITEMS,
  FAQ_LABEL,
  FAQ_SECTION_ID,
} from './faq.constants';
/* FAQ styles loaded locally (Resources FAQ + this section). */
import './faq.css';

export function FAQSection() {
  return (
    <section
      id={FAQ_SECTION_ID}
      aria-labelledby={FAQ_HEADING_ID}
      className="faq-section bg-background text-foreground homepage-section"
    >
      <Container size="xl">
        <HomepageReveal name="faq" className="homepage-section-intro max-w-2xl text-left">
          <p
            className={cn(
              'section-intro-eyebrow faq-label',
              'font-sans text-[12px] font-[var(--font-weight-semibold)]',
              'uppercase tracking-[0.16em]',
            )}
          >
            {FAQ_LABEL}
          </p>

          <h2
            id={FAQ_HEADING_ID}
            className={cn(
              'section-intro-heading font-sans font-bold text-foreground',
              'text-[28px] leading-[1.2] tracking-[-0.02em]',
              'sm:text-[32px] lg:text-[34px]',
            )}
          >
            {FAQ_HEADING}
          </h2>

          <p
            className={cn(
              'section-intro-description max-w-2xl',
              'font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground',
              'sm:text-[16px]',
            )}
          >
            {FAQ_DESCRIPTION}
          </p>
        </HomepageReveal>

        <div className="section-content-grid">
          <HomepageReveal name="faq" delayMs={80}>
            <FaqAccordionLazy items={FAQ_ITEMS} />
          </HomepageReveal>
        </div>
      </Container>
    </section>
  );
}
