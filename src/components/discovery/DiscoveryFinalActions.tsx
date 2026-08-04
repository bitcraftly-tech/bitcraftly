import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import {
  DISCOVERY_COMPLETE_META,
  DISCOVERY_FINAL_ACTIONS,
  DISCOVERY_NAV,
} from './discovery.content';
import type { DiscoveryLead, DiscoveryRecommendation } from './types';

interface DiscoveryFinalActionsProps {
  readonly lead: DiscoveryLead;
  readonly recommendation: DiscoveryRecommendation;
  readonly onRestart: () => void;
}

export function DiscoveryFinalActions({
  lead,
  recommendation,
  onRestart,
}: DiscoveryFinalActionsProps) {
  return (
    <div className="df-card">
      <p className="df-eyebrow">{DISCOVERY_COMPLETE_META.eyebrow}</p>
      <h2 className="df-title">{DISCOVERY_COMPLETE_META.title}</h2>
      <p className="df-desc">{DISCOVERY_COMPLETE_META.description}</p>

      <div className="df-summary">
        <p>
          <strong>{lead.name}</strong>
          {lead.company ? ` · ${lead.company}` : ''}
        </p>
        <p>
          {recommendation.packageName} · {recommendation.estimatedInvestment} ·{' '}
          {recommendation.estimatedTimeline}
        </p>
        <p>
          {lead.email} · {lead.phone}
        </p>
      </div>

      <div className="df-final-actions">
        {DISCOVERY_FINAL_ACTIONS.map((action) => {
          const className = bcButtonClassName({
            variant: action.variant,
            size: 'lg',
            className:
              action.variant === 'primary'
                ? 'group h-[50px] w-full justify-center px-[22px]'
                : 'h-[50px] w-full justify-center px-[22px]',
          });

          return (
            <Link key={action.id} href={action.href} className={className}>
              <span>{action.label}</span>
              {action.variant === 'primary' ? <ButtonArrow className="text-[15px]" /> : null}
            </Link>
          );
        })}
      </div>

      <div className="df-actions">
        <button
          type="button"
          className={bcButtonClassName({
            variant: 'ghost',
            size: 'md',
            className: 'h-[44px] px-[16px]',
          })}
          onClick={onRestart}
        >
          {DISCOVERY_NAV.restartLabel}
        </button>
      </div>
    </div>
  );
}
