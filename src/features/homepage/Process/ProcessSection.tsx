import { Container } from '@/components/ui/container';
import { cn } from '@/lib/cn';
import { ProcessIntroCta } from './ProcessIntroCta';
import { ProcessReveal } from './ProcessReveal';
import { ProcessSideCta } from './ProcessSideCta';
import { ProcessStepCard } from './ProcessStepCard';
import {
  PROCESS_DESCRIPTION,
  PROCESS_HEADING,
  PROCESS_HEADING_ID,
  PROCESS_LABEL,
  PROCESS_SECTION_ID,
  PROCESS_SIDE_CTA,
  PROCESS_STEPS,
} from './process.constants';
import './process.css';

interface ProcessSectionProps {
  /**
   * `center` — homepage centered intro with CTA under description.
   * `split` — left intro + right CTA (Services Decision Guide pattern).
   */
  introLayout?: 'center' | 'split';
}

export function ProcessSection({ introLayout = 'split' }: ProcessSectionProps) {
  const isSplit = introLayout === 'split';

  const introCopy = (
    <>
      <p
        className={cn(
          'section-intro-eyebrow process-label',
          'font-sans text-[12px] font-[var(--font-weight-semibold)]',
          'uppercase tracking-[0.16em]',
        )}
      >
        {PROCESS_LABEL}
      </p>

      <h2
        id={PROCESS_HEADING_ID}
        className={cn(
          'section-intro-heading font-sans font-bold text-foreground',
          'text-[28px] leading-[1.2] tracking-[-0.02em]',
          'sm:text-[32px] lg:text-[34px]',
          !isSplit && 'md:whitespace-nowrap',
        )}
      >
        {PROCESS_HEADING}
      </h2>

      <p
        className={cn(
          'section-intro-description',
          !isSplit && 'mx-auto max-w-[520px]',
          isSplit && 'max-w-2xl',
          'font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground',
          'sm:text-[16px]',
        )}
      >
        {PROCESS_DESCRIPTION}
      </p>
    </>
  );

  return (
    <section
      id={PROCESS_SECTION_ID}
      aria-labelledby={PROCESS_HEADING_ID}
      className="scroll-mt-[80px] bg-background text-foreground homepage-section"
    >
      <Container size="xl">
        {isSplit ? (
          <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
            <ProcessReveal className="min-w-0 max-w-2xl">
              <div className="services-section-intro">{introCopy}</div>
            </ProcessReveal>
            <ProcessIntroCta
              className={cn(
                'shrink-0 self-end text-[13px] gap-[4px]',
                'hover:opacity-80 hover:text-primary',
              )}
            />
          </div>
        ) : (
          <ProcessReveal className="homepage-section-intro mx-auto max-w-[640px] text-center">
            {introCopy}
            <div className="section-intro-actions flex justify-center">
              <ProcessIntroCta />
            </div>
          </ProcessReveal>
        )}

        <ol
          className={cn(
            'process-steps-grid m-0 flex list-none flex-col p-0',
            'sm:flex-row sm:flex-wrap',
            'lg:flex-nowrap lg:items-start lg:justify-between',
          )}
        >
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.id} className={cn('min-w-0 sm:w-[calc(50%-12px)] lg:w-auto lg:flex-1')}>
              <ProcessReveal delayMs={index * 70} className="h-full">
                <ProcessStepCard step={step} showConnector={index < PROCESS_STEPS.length - 1} />
              </ProcessReveal>
            </li>
          ))}
        </ol>

        <ProcessReveal delayMs={200} className="section-follow-block w-full">
          <ProcessSideCta content={PROCESS_SIDE_CTA} />
        </ProcessReveal>
      </Container>
    </section>
  );
}
