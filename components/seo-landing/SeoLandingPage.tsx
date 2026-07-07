import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Code2,
  Megaphone,
  MessageCircle,
  ShoppingCart,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { CONTAINER, MARKETING_BELOW_BREADCRUMB_PT, SECTION_PY, SECTION_PY_COMPACT, SECTION_SCROLL_MT, whatsappUrl } from "@/lib/constants";
import type { SeoLandingConfig } from "@/lib/seo-landing/types";
import { resolveWhatsAppMessage } from "@/lib/whatsappFunnel";

import SeoLandingHeroVisual from "./SeoLandingHeroVisual";
import "./seo-landing.css";

type SeoLandingPageProps = {
  config: SeoLandingConfig;
};

const SOLUTION_ICONS: LucideIcon[] = [Target, Megaphone, ShoppingCart, Calendar, MessageCircle, Code2];

/** Real product preview images from public/products — mapped by showcase route */
const PROOF_PREVIEW_IMAGES: Record<string, string> = {
  "/portfolio/local-services-leads-showcase": "/products/Local Services Lead Site.png",
  "/portfolio/gym-fitness-showcase": "/products/Gym Website.png",
  "/portfolio/clinic-healthcare-showcase": "/products/Clinic & Healthcare.png",
  "/portfolio/ecommerce-store-showcase": "/products/Ecommerce Store.png",
  "/portfolio/react-video-demo": "/products/Next-Gen SaaS Platform.png",
};

const PORTFOLIO_MOSAIC = [
  "/products/Gym Website.png",
  "/products/Clinic & Healthcare.png",
  "/products/School Website.png",
  "/products/Local Services Lead Site.png",
] as const;

function contactHref(config: SeoLandingConfig, intent: "consultation" | "quote" = "consultation"): string {
  const params = new URLSearchParams({
    intent,
    source: config.analytics.contactSource,
    service: config.analytics.serviceParam,
  });
  return `/contact?${params.toString()}`;
}

function whatsappConsultHref(config: SeoLandingConfig): string {
  return whatsappUrl(
    resolveWhatsAppMessage({
      intent: "consultation",
      source: config.analytics.contactSource,
      service: config.analytics.serviceParam,
    }),
  );
}

export default function SeoLandingPage({ config }: SeoLandingPageProps) {
  const consultationHref = contactHref(config);
  const whatsappHref = whatsappConsultHref(config);

  return (
    <div className="seo-landing-page">
      {/* Premium two-column hero */}
      <div className="seo-landing-hero-band">
        <div className={`${CONTAINER} seo-hero-grid pb-8 md:pb-16 ${MARKETING_BELOW_BREADCRUMB_PT}`}>
          <div className="seo-hero-content min-w-0">
            <p className="seo-eyebrow">{config.hero.eyebrow}</p>
            <h1>{config.hero.title}</h1>
            <p className="seo-hero-lead">{config.hero.description}</p>

            <div className="seo-hero-actions marketing-hero-actions mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link href={consultationHref} className="marketing-hero-btn marketing-hero-btn--primary">
                Book free consultation
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="marketing-hero-btn marketing-hero-btn--secondary"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          <div className="seo-hero-visual-wrap min-w-0">
            <SeoLandingHeroVisual />
          </div>

          <ul className="seo-hero-trust">
            {config.trustStrip.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Business problems */}
      <section
        id="problems"
        className={`seo-section seo-section--surface ${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY} dark:border-dark-border-primary`}
      >
        <div className="max-w-3xl">
          <p className="seo-eyebrow">Local business challenges</p>
          <h2 className="seo-section-title">{config.problems.title}</h2>
          <p className="seo-prose mt-5">{config.problems.intro}</p>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-x-12">
          {config.problems.items.map((item, index) => (
            <article key={item.title} className="seo-problem-item">
              <span className="seo-problem-item__num">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Website solutions */}
      <div className="seo-section seo-section--tint">
        <section id="solutions" className={`${CONTAINER} ${SECTION_SCROLL_MT} ${SECTION_PY}`}>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="seo-eyebrow">What we build</p>
              <h2 className="seo-section-title">{config.solutions.title}</h2>
              <p className="seo-prose mt-5">{config.solutions.intro}</p>
            </div>

            <div className="space-y-5 lg:col-span-7">
              {config.solutions.items.map((item, index) => {
                const Icon = SOLUTION_ICONS[index] ?? Target;

                return (
                  <article
                    key={item.title}
                    className={`seo-solution-item ${index === 0 || index === 3 ? "seo-solution-item--accent" : ""}`}
                  >
                    <span className="seo-solution-item__num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="seo-solution-item__icon" aria-hidden>
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <h3 className="pr-8 text-base font-semibold text-text-primary dark:text-dark-text-primary sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                      {item.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Local Ghaziabad context */}
      <div className="seo-section seo-section--local">
        <section id="local-context" className={`relative ${CONTAINER} ${SECTION_SCROLL_MT} ${SECTION_PY}`}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <p className="seo-eyebrow">{config.local.eyebrow}</p>
              <h2 className="seo-section-title">{config.local.title}</h2>
              <div className="mt-6 space-y-5">
                {config.local.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="seo-prose seo-prose--wide">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <aside className="seo-local-aside lg:col-span-5">
              <p className="seo-eyebrow">Typical audiences</p>
              <ul className="seo-local-tags mt-5">
                {config.local.audiences.map((audience) => (
                  <li key={audience} className="seo-local-tag">
                    {audience}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </div>

      {/* Proof / portfolio */}
      <section
        id="proof"
        className={`seo-section seo-section--surface ${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY} dark:border-dark-border-primary`}
      >
        <div className="max-w-2xl">
          <p className="seo-eyebrow">Relevant work</p>
          <h2 className="seo-section-title">Proof you can review before we talk</h2>
          <p className="seo-prose mt-4">
            Live portfolio entries and interactive showcases — labelled honestly so you know what is a demo versus a delivered case study.
          </p>
        </div>

        <div className="seo-proof-grid mt-8 md:mt-10">
          {config.proof.map((item) => {
            const previewImage = PROOF_PREVIEW_IMAGES[item.href];
            const isPortfolioHub = item.href === "/portfolio";

            return (
              <Link key={item.href} href={item.href} className="seo-proof-link group">
                <div
                  className={`seo-proof-link__frame ${isPortfolioHub ? "seo-proof-link__frame--mosaic" : ""}`}
                >
                  {isPortfolioHub ? (
                    PORTFOLIO_MOSAIC.map((src) => (
                      <div key={src} className="seo-proof-link__mosaic-cell">
                        <Image src={src} alt="" fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover object-top" />
                      </div>
                    ))
                  ) : previewImage ? (
                    <Image
                      src={previewImage}
                      alt={`${item.title} preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                    />
                  ) : null}
                </div>
                <div className="seo-proof-link__body">
                  <span className="inline-flex w-fit rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                    {item.badge}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-text-primary group-hover:text-accent-primary dark:text-dark-text-primary dark:group-hover:text-indigo-400">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                    {item.description}
                  </p>
                  <span className="seo-proof-link__view mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-primary dark:text-indigo-400">
                    View
                    <ArrowRight size={14} className="transition group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Delivery process */}
      <div className="seo-section seo-section--tint">
        <section id="process" className={`${CONTAINER} ${SECTION_SCROLL_MT} ${SECTION_PY}`}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="seo-eyebrow">Delivery process</p>
              <h2 className="seo-section-title">{config.process.title}</h2>
              <p className="seo-prose mt-4">{config.process.intro}</p>
            </div>

            <ol className="seo-process-rail lg:col-span-8">
              {config.process.steps.map((step) => (
                <li key={step.n} className="seo-process-step">
                  <span className="seo-process-step__marker">{step.n}</span>
                  <p className="seo-process-step__title">{step.title}</p>
                  <p className="seo-process-step__desc">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* Why Bitcraftly — dark premium band */}
      <div className="seo-section seo-section--dark">
        <section id="why-bitcraftly" className={`${CONTAINER} ${SECTION_SCROLL_MT} ${SECTION_PY}`}>
          <div className="max-w-3xl">
            <p className="seo-eyebrow">Why Bitcraftly</p>
            <h2 className="seo-section-title">{config.why.title}</h2>
            <p className="seo-prose mt-5">{config.why.intro}</p>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm sm:p-4">
            {config.why.points.map((point, index) => (
              <article key={point.title} className="seo-why-row">
                <p className="seo-why-row__num">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="text-base font-semibold text-white sm:text-lg">{point.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-300">{point.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Pricing guidance */}
      <section
        id="pricing"
        className={`seo-section seo-section--surface ${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY} dark:border-dark-border-primary`}
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="seo-eyebrow">Pricing guidance</p>
            <h2 className="seo-section-title">{config.pricing.title}</h2>
            <p className="seo-prose mt-5">{config.pricing.intro}</p>
            <Link href="/pricing" className="seo-pricing-link">
              Compare all packages on /pricing
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {config.pricing.packages.map((pkg, index) => (
              <article
                key={pkg.name}
                className={`seo-pricing-card ${index === 1 ? "seo-pricing-card--featured sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <h3 className="text-base font-semibold text-text-primary dark:text-dark-text-primary">{pkg.name}</h3>
                <p className="text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">{pkg.note}</p>
                <p className="seo-pricing-card__price mt-2">{pkg.price}</p>
              </article>
            ))}
            <p className="text-sm leading-relaxed text-text-tertiary dark:text-dark-text-tertiary sm:col-span-2">
              {config.pricing.footnote}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="seo-section seo-section--tint">
        <section id="faq" className={`${CONTAINER} ${SECTION_SCROLL_MT} ${SECTION_PY}`}>
          <div className="max-w-3xl">
            <p className="seo-eyebrow">FAQ</p>
            <h2 className="seo-section-title">{config.faqSectionTitle}</h2>
          </div>

          <div className="mt-10 max-w-3xl space-y-3">
            {config.faqs.map((item) => (
              <details key={item.q} className="seo-faq-details group">
                <summary>
                  {item.q}
                  <span className="seo-faq-details__icon" aria-hidden>
                    +
                  </span>
                </summary>
                <div className="seo-faq-details__answer">{item.a}</div>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* Related links */}
      <section
        id="related"
        className={`seo-section seo-section--surface ${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY_COMPACT} dark:border-dark-border-primary`}
      >
        <p className="seo-eyebrow">Explore further</p>
        <h2 className="seo-section-title">Related pages</h2>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {config.related.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="seo-related-link group">
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                    {link.label}
                  </span>
                  {link.description ? (
                    <span className="mt-1 block text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                      {link.description}
                    </span>
                  ) : null}
                </span>
                <ArrowRight size={16} className="seo-related-link__arrow" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <div className="seo-section seo-section--cta">
        <section id="consultation" className={`${CONTAINER} ${SECTION_SCROLL_MT} py-12 md:py-16`}>
          <div className="seo-final-cta">
            <div className="seo-final-cta__glow" aria-hidden />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-primary dark:text-indigo-400">
                Next step
              </p>
              <h2 className="seo-final-cta__title mt-3">{config.finalCta.title}</h2>
              <p className="seo-prose mx-auto mt-4 max-w-2xl text-center">{config.finalCta.description}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={consultationHref} className="bc-btn bc-btn-primary w-full min-w-[14rem] px-8 py-3.5 sm:w-auto">
                  Book free consultation
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bc-btn bc-btn-secondary w-full min-w-[14rem] px-8 py-3.5 sm:w-auto"
                >
                  WhatsApp Sanjay
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
