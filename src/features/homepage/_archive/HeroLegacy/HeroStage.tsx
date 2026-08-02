import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import {
  HERO_ASSISTANT,
  HERO_ASSISTANT_SUGGESTIONS,
  HERO_AUTOMATION,
  HERO_AUTOMATION_STEPS,
  HERO_DASHBOARD,
  HERO_STAGE_PROGRESS,
  HERO_STAGE_USERS,
} from './hero.constants';

/**
 * Live product stage — floating UI orbit around the brand mark.
 * Replaces the flat hero webp so the ATF feels like a working product system.
 */
export function HeroStage() {
  return (
    <div className="hero-stage" aria-hidden="true">
      <div className="hero-stage-atmosphere" />
      <div className="hero-stage-orbit hero-stage-orbit--outer" />
      <div className="hero-stage-orbit hero-stage-orbit--inner" />

      <div className="hero-stage-core">
        <div className="hero-stage-pedestal" />
        <div className="hero-stage-cube">
          <span className="hero-stage-cube-face hero-stage-cube-face--front">B</span>
          <span className="hero-stage-cube-face hero-stage-cube-face--side" />
          <span className="hero-stage-cube-face hero-stage-cube-face--top" />
        </div>
      </div>

      <article className="hero-stage-card hero-stage-card--assistant">
        <header className="hero-stage-card-head">
          <span className="hero-stage-dot hero-stage-dot--live" />
          <div>
            <p className="hero-stage-card-title">{HERO_ASSISTANT.name}</p>
            <p className="hero-stage-card-sub">{HERO_ASSISTANT.version}</p>
          </div>
          <span className="hero-stage-pill">{HERO_ASSISTANT.status}</span>
        </header>
        <p className="hero-stage-message">{HERO_ASSISTANT.message}</p>
        <div className="hero-stage-chips">
          {HERO_ASSISTANT_SUGGESTIONS.map((item) => (
            <Link key={item.text} href={item.href} className="hero-stage-chip" tabIndex={-1}>
              {item.text}
            </Link>
          ))}
        </div>
      </article>

      <article className="hero-stage-card hero-stage-card--revenue">
        <header className="hero-stage-card-head">
          <span className="hero-stage-icon" aria-hidden>
            <Icon name="trending-up" size="sm" className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="hero-stage-card-title">{HERO_DASHBOARD.title}</p>
            <p className="hero-stage-card-sub">{HERO_DASHBOARD.subtitle}</p>
          </div>
          <span className="hero-stage-pill hero-stage-pill--up">{HERO_DASHBOARD.growth}</span>
        </header>
        <p className="hero-stage-metric-label">{HERO_DASHBOARD.revenueLabel}</p>
        <p className="hero-stage-metric-value">{HERO_DASHBOARD.revenueValue}</p>
        <svg className="hero-stage-spark" viewBox="0 0 160 42" aria-hidden>
          <path
            d="M0 32 C18 28 28 34 42 22 C56 10 68 18 84 12 C102 5 118 16 136 8 C148 3 156 6 160 4"
            fill="none"
            stroke="url(#hero-stage-spark)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="hero-stage-spark" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
      </article>

      <article className="hero-stage-card hero-stage-card--progress">
        <p className="hero-stage-card-title">Project Progress</p>
        <ul className="hero-stage-progress-list">
          {HERO_STAGE_PROGRESS.map((item) => (
            <li key={item.label}>
              <div className="hero-stage-progress-meta">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <span className="hero-stage-progress-track">
                <span className="hero-stage-progress-fill" style={{ width: `${item.value}%` }} />
              </span>
            </li>
          ))}
        </ul>
      </article>

      <article className="hero-stage-card hero-stage-card--users">
        <p className="hero-stage-card-sub">Users</p>
        <p className="hero-stage-metric-value hero-stage-metric-value--sm">
          {HERO_STAGE_USERS.value}
        </p>
        <span className="hero-stage-pill hero-stage-pill--up">{HERO_STAGE_USERS.change}</span>
        <svg className="hero-stage-spark hero-stage-spark--sm" viewBox="0 0 96 28" aria-hidden>
          <path
            d="M0 20 C12 18 18 22 28 14 C40 4 50 16 62 10 C74 4 84 8 96 3"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </article>

      <article className="hero-stage-card hero-stage-card--flow">
        <header className="hero-stage-card-head">
          <div>
            <p className="hero-stage-card-title">{HERO_AUTOMATION.title}</p>
            <p className="hero-stage-card-sub">{HERO_AUTOMATION.subtitle}</p>
          </div>
          <span className="hero-stage-pill">{HERO_AUTOMATION.status}</span>
        </header>
        <ol className="hero-stage-flow">
          {HERO_AUTOMATION_STEPS.map((step, index) => (
            <li key={step.label} className={cn(step.completed && 'is-done')}>
              <span className="hero-stage-flow-node">{index + 1}</span>
              <span className="hero-stage-flow-label">{step.label}</span>
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}
