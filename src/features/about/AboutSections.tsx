import Image from 'next/image';
import { MarketingFinalCtaBand } from '@/components/patterns/marketing-final-cta-band';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { PAGE_GRID_2_CLASS, PAGE_GRID_CLASS } from '@/lib/layout/page-shell';
import { cn } from '@/lib/cn';
import {
  ABOUT_CTA,
  ABOUT_CULTURE,
  ABOUT_FEATURED_CASE,
  ABOUT_LEADERSHIP,
  ABOUT_MISSION,
  ABOUT_PROCESS,
  ABOUT_STORY,
  ABOUT_TECH,
  ABOUT_TECH_GROUPS,
  ABOUT_TESTIMONIALS,
  ABOUT_TESTIMONIALS_COPY,
  ABOUT_TRUST_POINTS,
  ABOUT_TRUST_STATS,
  ABOUT_TRUSTED_BY_COPY,
  ABOUT_TRUSTED_LOGOS,
  ABOUT_VALUES,
  ABOUT_VISION,
} from './about.content';
import { AboutFeaturedCaseStudyCard } from './AboutFeaturedCaseStudyCard';
import { AboutStoryArchitectureVisual } from './AboutStoryArchitectureVisual';
import { AboutTestimonialCard } from './AboutTestimonialCard';
import { AboutTrustedBy } from './AboutTrustedBy';

function SectionIntro({
  eyebrow,
  headingId,
  heading,
  lede,
  className,
}: {
  eyebrow: string;
  headingId: string;
  heading: string;
  lede?: string;
  className?: string;
}) {
  return (
    <header className={cn('mb-[32px] max-w-2xl', className)}>
      <p className="about-eyebrow">{eyebrow}</p>
      <h2 id={headingId} className="about-heading">
        {heading}
      </h2>
      {lede ? <p className="about-lede">{lede}</p> : null}
    </header>
  );
}

export function AboutStorySection() {
  return (
    <Section
      id={ABOUT_STORY.id}
      spacing="lg"
      aria-labelledby={ABOUT_STORY.headingId}
      className="border-t border-border/50"
    >
      <SectionIntro
        eyebrow={ABOUT_STORY.eyebrow}
        headingId={ABOUT_STORY.headingId}
        heading={ABOUT_STORY.heading}
      />
      <div className="about-story">
        <div className="about-story__prose">
          {ABOUT_STORY.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="about-prose">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="about-story__visual">
          <AboutStoryArchitectureVisual className="about-story__svg text-primary" />
        </div>
      </div>
    </Section>
  );
}

export function AboutMissionVisionSection() {
  return (
    <Section
      spacing="lg"
      background="surface"
      aria-label="Mission and vision"
      className="border-t border-border/50"
    >
      <div className={PAGE_GRID_2_CLASS}>
        <article
          id={ABOUT_MISSION.id}
          aria-labelledby={ABOUT_MISSION.headingId}
          className="about-card"
        >
          <p className="about-eyebrow">{ABOUT_MISSION.eyebrow}</p>
          <h2 id={ABOUT_MISSION.headingId} className="about-heading">
            {ABOUT_MISSION.heading}
          </h2>
          <p className="about-lede">{ABOUT_MISSION.body}</p>
        </article>
        <article
          id={ABOUT_VISION.id}
          aria-labelledby={ABOUT_VISION.headingId}
          className="about-card"
        >
          <p className="about-eyebrow">{ABOUT_VISION.eyebrow}</p>
          <h2 id={ABOUT_VISION.headingId} className="about-heading">
            {ABOUT_VISION.heading}
          </h2>
          <p className="about-lede">{ABOUT_VISION.body}</p>
        </article>
      </div>
    </Section>
  );
}

export function AboutValuesSection() {
  return (
    <Section
      id="about-values"
      spacing="lg"
      aria-labelledby="about-values-heading"
      className="border-t border-border/50"
    >
      <SectionIntro
        eyebrow="Values"
        headingId="about-values-heading"
        heading="Why teams trust how we work"
        lede="Each principle answers a practical hiring question — clarity, ownership, quality, and longevity."
      />
      <ul className={cn(PAGE_GRID_CLASS, 'about-card-grid m-0 list-none p-0')}>
        {ABOUT_VALUES.map((value) => (
          <li key={value.id} className="about-card-grid__item">
            <article className="about-card">
              <div className="about-card__head">
                <span className="about-icon" aria-hidden>
                  <Icon name={value.icon} size="sm" className="h-[18px] w-[18px]" />
                </span>
                <h3 className="about-card__title">{value.title}</h3>
              </div>
              <p className="about-card__body">{value.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function AboutLeadershipSection() {
  const leader = ABOUT_LEADERSHIP[0];
  if (!leader) return null;

  return (
    <Section
      id="about-leadership"
      spacing="lg"
      aria-labelledby="about-leadership-heading"
      className="border-t border-border/50"
    >
      <SectionIntro
        eyebrow="Leadership"
        headingId="about-leadership-heading"
        heading="Founder-led from architecture to delivery"
        lede="You work with the person accountable for product architecture, AI decisions, and release quality — not a rotating junior handoff."
      />
      <article className="about-leader">
        <div>
          <div className="about-leader__identity">
            <div className="about-leader__photo">
              <Image
                src={leader.photoSrc}
                alt={leader.photoAlt}
                fill
                sizes="72px"
                className="object-cover object-[46%_14%] scale-[1.14]"
              />
            </div>
            <div className="min-w-0">
              <h3 className="m-0 font-sans text-[22px] font-bold tracking-[-0.02em] text-foreground">
                {leader.name}
              </h3>
              <p className="m-0 mt-[4px] font-sans text-[14px] font-semibold text-primary">
                {leader.role}
              </p>
            </div>
          </div>
          <ul className="about-leader__badges" aria-label="Professional credentials">
            {leader.badges.map((badge) => (
              <li key={badge}>{badge}</li>
            ))}
          </ul>
          <p className="about-prose mt-[16px]">{leader.bio}</p>
        </div>
        <div>
          <p className="about-eyebrow">Focus areas</p>
          <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
            {leader.focus.map((item) => (
              <li
                key={item}
                className="flex items-start gap-[10px] font-sans text-[14px] leading-[1.5] text-foreground"
              >
                <Icon
                  name="check"
                  size="sm"
                  aria-hidden
                  className="mt-[2px] h-[16px] w-[16px] shrink-0 text-primary"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Section>
  );
}

export function AboutCultureSection() {
  return (
    <Section
      id="about-culture"
      spacing="lg"
      background="surface"
      aria-labelledby="about-culture-heading"
      className="border-t border-border/50"
    >
      <SectionIntro
        eyebrow="Engineering culture"
        headingId="about-culture-heading"
        heading="How we keep quality high under real deadlines"
        lede="Process exists to protect outcomes — not to create theater."
      />
      <ul className={cn(PAGE_GRID_2_CLASS, 'about-card-grid m-0 list-none p-0')}>
        {ABOUT_CULTURE.map((item) => (
          <li key={item.id} className="about-card-grid__item">
            <article className="about-card">
              <div className="about-card__head">
                <span className="about-icon" aria-hidden>
                  <Icon name={item.icon} size="sm" className="h-[18px] w-[18px]" />
                </span>
                <h3 className="about-card__title">{item.title}</h3>
              </div>
              <p className="about-card__body">{item.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function AboutTechnologySection() {
  return (
    <Section
      id="about-technology"
      spacing="lg"
      aria-labelledby="about-technology-heading"
      className="border-t border-border/50"
    >
      <SectionIntro
        eyebrow="Technology"
        headingId="about-technology-heading"
        heading="A modern stack chosen for longevity"
        lede="Grouped by how we use it — frontend, backend & data, then AI and delivery."
      />
      <div className="about-tech-groups">
        {ABOUT_TECH_GROUPS.map((group) => {
          const items = ABOUT_TECH.filter((item) => item.group === group.id);
          return (
            <div key={group.id} className="about-tech-group">
              <h3 className="about-tech-group__label">{group.label}</h3>
              <ul className={cn(PAGE_GRID_CLASS, 'about-card-grid m-0 list-none p-0')}>
                {items.map((item) => (
                  <li
                    key={item.id}
                    className={cn(
                      'about-tech-chip about-card-grid__item',
                      item.featured && 'about-tech-chip--featured',
                    )}
                  >
                    <div className="about-card__head">
                      <span className="about-icon" aria-hidden>
                        <Icon name={item.icon} size="sm" className="h-[18px] w-[18px]" />
                      </span>
                      <h4 className="about-card__title">{item.label}</h4>
                    </div>
                    <p className="about-card__body">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function AboutFeaturedCaseSection() {
  return (
    <Section
      id={ABOUT_FEATURED_CASE.id}
      spacing="lg"
      background="surface"
      aria-labelledby={`${ABOUT_FEATURED_CASE.id}-heading`}
      className="border-t border-border/50"
    >
      <AboutFeaturedCaseStudyCard study={ABOUT_FEATURED_CASE} />
    </Section>
  );
}

export function AboutProcessSection() {
  return (
    <Section
      id="about-process"
      spacing="lg"
      aria-labelledby="about-process-heading"
      className="border-t border-border/50"
    >
      <SectionIntro
        eyebrow="Delivery process"
        headingId="about-process-heading"
        heading="A clear path from idea to production"
        lede="Seven stages. Written milestones. Continuous visibility from discovery through support."
      />
      <ol className="about-process-list">
        {ABOUT_PROCESS.map((step) => (
          <li key={step.id} className="about-process-step">
            <div className="about-process-step__rail" aria-hidden>
              <span className="about-process-step__dot" />
            </div>
            <p className="about-process-index">{step.step}</p>
            <div>
              <h3 className="about-card__title">{step.title}</h3>
              <p className="about-card__body">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function AboutTrustedBySection() {
  return (
    <AboutTrustedBy
      headingId={ABOUT_TRUSTED_BY_COPY.headingId}
      eyebrow={ABOUT_TRUSTED_BY_COPY.eyebrow}
      heading={ABOUT_TRUSTED_BY_COPY.heading}
      lede={ABOUT_TRUSTED_BY_COPY.lede}
      logos={ABOUT_TRUSTED_LOGOS}
    />
  );
}

export function AboutTestimonialsSection() {
  return (
    <Section
      id={ABOUT_TESTIMONIALS_COPY.id}
      spacing="lg"
      background="surface"
      aria-labelledby={ABOUT_TESTIMONIALS_COPY.headingId}
      className="border-t border-border/50"
    >
      <SectionIntro
        eyebrow={ABOUT_TESTIMONIALS_COPY.eyebrow}
        headingId={ABOUT_TESTIMONIALS_COPY.headingId}
        heading={ABOUT_TESTIMONIALS_COPY.heading}
        lede={ABOUT_TESTIMONIALS_COPY.lede}
      />
      <ul className={cn(PAGE_GRID_2_CLASS, 'm-0 list-none p-0')}>
        {ABOUT_TESTIMONIALS.map((item) => (
          <li key={item.id}>
            <AboutTestimonialCard testimonial={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function AboutTrustSection() {
  return (
    <Section
      id="about-trust"
      spacing="lg"
      aria-labelledby="about-trust-heading"
      className="border-t border-border/50"
    >
      <SectionIntro
        eyebrow="Trust"
        headingId="about-trust-heading"
        heading="Proof points teams check before they hire"
        lede="Experience, ownership, and delivery discipline — backed by process, not slogans."
      />
      <ul className={cn(PAGE_GRID_CLASS, 'm-0 mb-[32px] list-none p-0 lg:grid-cols-4')}>
        {ABOUT_TRUST_STATS.map((stat) => (
          <li key={stat.id} className="about-stat">
            <p className="about-stat__value">{stat.value}</p>
            <p className="about-stat__label">{stat.label}</p>
          </li>
        ))}
      </ul>
      <ul className="m-0 grid list-none gap-[12px] p-0 sm:grid-cols-2">
        {ABOUT_TRUST_POINTS.map((point) => (
          <li
            key={point}
            className="flex items-start gap-[10px] font-sans text-[14px] leading-[1.55] text-foreground"
          >
            <Icon
              name="check"
              size="sm"
              aria-hidden
              className="mt-[2px] h-[16px] w-[16px] shrink-0 text-primary"
            />
            {point}
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function AboutCtaSection() {
  return (
    <MarketingFinalCtaBand
      headingId={ABOUT_CTA.headingId}
      heading={ABOUT_CTA.heading}
      description={ABOUT_CTA.description}
      reassurance={ABOUT_CTA.reassurance}
      primaryCta={ABOUT_CTA.primaryCta}
      tertiaryCta={ABOUT_CTA.tertiaryCta}
      trust={ABOUT_CTA.trust}
    />
  );
}
