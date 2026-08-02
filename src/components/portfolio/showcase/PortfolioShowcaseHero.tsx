'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Globe, MessageCircle, Smartphone, type LucideIcon } from 'lucide-react';

import { useMobileStaticEntrance } from '@/hooks/useMobileStaticEntrance';
import { newTabProps } from '@/lib/newTabLink';
import { PORTFOLIO } from '@/lib/portfolioContent';

import './portfolio-showcase.css';

type PortfolioShowcaseHeroProps = {
  variant: 'home' | 'page';
};

const SHOWCASE_STATS = PORTFOLIO.performanceMetrics.slice(0, 4);

const STAT_ICONS: LucideIcon[] = [Smartphone, MessageCircle, Globe, Code2];

export default function PortfolioShowcaseHero({ variant }: PortfolioShowcaseHeroProps) {
  const reduceMotion = useReducedMotion();
  const staticEntrance = useMobileStaticEntrance();
  const skipEntrance = reduceMotion || staticEntrance;
  const isPage = variant === 'page';
  const isHome = variant === 'home';

  return (
    <motion.div
      initial={skipEntrance ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="ps-showcase-hero w-full max-w-full"
    >
      <div className="ps-showcase-hero-copy w-full min-w-0">
        <p className="ps-showcase-eyebrow">{PORTFOLIO.featuredLabel}</p>
        {isPage ? (
          <h1 id="portfolio-page-heading" className="ps-showcase-heading">
            Our <span className="ps-showcase-heading__accent">Portfolio</span>
          </h1>
        ) : (
          <h2 id="portfolio-showcase-heading" className="ps-showcase-heading">
            Our <span className="ps-showcase-heading__accent">Portfolio</span>
          </h2>
        )}
        <p className="ps-showcase-lead">
          {isPage ? PORTFOLIO.showcaseDescription : PORTFOLIO.intro}
        </p>

        <div className="ps-showcase-badge">
          <span className="ps-showcase-badge__icon" aria-hidden>
            <span className="ps-showcase-badge__pulse" />
          </span>
          <span className="ps-showcase-badge__copy">
            <span className="ps-showcase-badge__title">{PORTFOLIO.experienceBadgeTitle}</span>
            <span className="ps-showcase-badge__body">{PORTFOLIO.experienceBadgeBody}</span>
          </span>
        </div>

        <p className="ps-showcase-note">{PORTFOLIO.introNote}</p>
      </div>

      <div className="ps-showcase-hero-aside">
        <div className="ps-showcase-stats-panel">
          <div className="ps-showcase-stats-panel__head">
            <span className="ps-showcase-stats-panel__live" aria-hidden />
            <p className="ps-showcase-stats-panel__label">What we optimize</p>
          </div>
          <aside
            className="ps-showcase-stats w-full max-w-full min-w-0"
            aria-label="Portfolio highlights"
          >
            {SHOWCASE_STATS.map((stat, index) => {
              const Icon = STAT_ICONS[index] ?? Smartphone;
              return (
                <motion.div
                  key={stat.label}
                  initial={skipEntrance ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.38,
                    delay: 0.08 + index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="ps-showcase-stat"
                >
                  <span className="ps-showcase-stat__icon" aria-hidden>
                    <Icon className="size-3.5" strokeWidth={2.25} />
                  </span>
                  <span className="ps-showcase-stat__index" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="ps-showcase-stat__body">
                    <p className="ps-showcase-stat-value">{stat.value}</p>
                    <p className="ps-showcase-stat-label">{stat.label}</p>
                    <p className="ps-showcase-stat-note">{stat.note}</p>
                  </div>
                </motion.div>
              );
            })}
          </aside>
        </div>

        {isHome ? (
          <Link
            href="/portfolio"
            className="ps-showcase-link ps-showcase-link--cta"
            {...newTabProps('/portfolio')}
          >
            <span>View full portfolio</span>
            <span className="ps-showcase-link__arrow" aria-hidden>
              →
            </span>
          </Link>
        ) : null}
      </div>
    </motion.div>
  );
}
