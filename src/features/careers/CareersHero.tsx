import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import { getCareersApplyHref } from "./careers.content";

interface CareersHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
}

/**
 * Careers hero — visual parity with https://bitcraftly.com/careers
 * (light surface, gradient title mark, rounded-full CTAs).
 */
export function CareersHero({ breadcrumbs }: CareersHeroProps) {
  return (
    <Section
      spacing="lg"
      aria-labelledby="careers-page-heading"
      className="careers-hero border-b border-border/60"
    >
      <div className="careers-hero__glow" aria-hidden />
      <div className="careers-hero__content relative">
        <MarketingBreadcrumbs
          items={breadcrumbs}
          className="mb-[var(--space-3)]"
        />

        <p className="careers-hero__eyebrow">Careers at Bitcraftly</p>

        <h1 id="careers-page-heading" className="careers-hero__title">
          Build products that{" "}
          <span className="careers-hero__title-mark">SMBs actually use</span>
        </h1>

        <p className="careers-hero__description">
          Premium studio hiring — remote-first, founder-led reviews, and a
          modern stack. Join a small team shipping websites, apps, and AI-powered
          web solutions.
        </p>

        <p className="careers-hero__note">
          Every application is read by Sanjay — no keyword bots, no outsourced
          recruiters.
        </p>

        <div className="careers-hero__actions">
          <Link
            href={getCareersApplyHref("general")}
            className="careers-hero__btn careers-hero__btn--primary"
          >
            Apply now
          </Link>
          <a href="#open-roles" className="careers-hero__btn careers-hero__btn--outline">
            View open roles
          </a>
          <Link
            href={ROUTES.about}
            className="careers-hero__btn careers-hero__btn--ghost"
          >
            Meet the team
            <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
