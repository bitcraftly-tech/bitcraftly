import { Icon, type IconName } from '@/components/ui/icon';
import type { LegalSiteNavActive } from './LegalSiteNav';

const PRIVACY_ITEMS: readonly {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: 'violet' | 'sky' | 'emerald' | 'amber';
}[] = [
  {
    id: 'collect',
    title: 'Collect less',
    description: 'Only contact & project details you share',
    icon: 'database',
    tone: 'violet',
  },
  {
    id: 'protect',
    title: 'Protect access',
    description: 'Modern stack with controlled access',
    icon: 'shield',
    tone: 'sky',
  },
  {
    id: 'rights',
    title: 'Honor requests',
    description: 'Access, correction, export, deletion',
    icon: 'check',
    tone: 'emerald',
  },
  {
    id: 'contact',
    title: 'Direct contact',
    description: 'privacy@bitcraftly.com for verified asks',
    icon: 'mail',
    tone: 'amber',
  },
] as const;

const TERMS_ITEMS: readonly {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: 'violet' | 'sky' | 'emerald' | 'amber';
}[] = [
  {
    id: 'accept',
    title: 'Acceptance',
    description: 'Using the site means these terms apply',
    icon: 'check',
    tone: 'violet',
  },
  {
    id: 'scope',
    title: 'Service scope',
    description: 'Web, apps, and custom work as agreed',
    icon: 'layout-grid',
    tone: 'sky',
  },
  {
    id: 'pay',
    title: 'Payments',
    description: 'Milestone-based unless written otherwise',
    icon: 'zap',
    tone: 'emerald',
  },
  {
    id: 'law',
    title: 'Governing law',
    description: 'India law · clear liability limits',
    icon: 'shield',
    tone: 'amber',
  },
] as const;

interface LegalHeroVisualProps {
  variant?: Extract<LegalSiteNavActive, 'privacy' | 'terms'>;
}

/**
 * Legal hero visual — Services-style glass panel (no stock illustration).
 */
export function LegalHeroVisual({ variant = 'privacy' }: LegalHeroVisualProps) {
  const isTerms = variant === 'terms';
  const items = isTerms ? TERMS_ITEMS : PRIVACY_ITEMS;

  return (
    <div className="legal-hero-visual" aria-hidden="true">
      <div className="legal-hero-visual__glow" />
      <div className="legal-hero-visual__panel">
        <div className="legal-hero-visual__panel-head">
          <span className="legal-hero-visual__badge">
            <Icon name="shield" size="sm" aria-hidden />
            {isTerms ? 'Engagement' : 'Trust posture'}
          </span>
          <p className="legal-hero-visual__panel-title">
            {isTerms ? 'What these terms cover' : 'How we handle data'}
          </p>
        </div>
        <ul className="legal-hero-visual__list">
          {items.map((item) => (
            <li key={item.id} className="legal-hero-visual__item">
              <span className={`legal-hero-visual__icon legal-hero-visual__icon--${item.tone}`}>
                <Icon name={item.icon} size="sm" />
              </span>
              <span className="legal-hero-visual__copy">
                <span className="legal-hero-visual__item-title">{item.title}</span>
                <span className="legal-hero-visual__item-desc">{item.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
