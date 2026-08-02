'use client';

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { AnimatedNumber } from './AnimatedNumber';
import { trackCostCalculatorEvent } from './analytics';
import type {
  CalculatorEstimateResult,
  CalculatorSelections,
  CostCalculatorCmsContent,
} from './cost-calculator.types';
import { downloadEstimatePdf } from './download-estimate-pdf';
import { formatInr } from './estimate-engine';

interface LivePricePanelProps {
  content: CostCalculatorCmsContent;
  estimate: CalculatorEstimateResult;
  selections: CalculatorSelections;
  quoteHref: string;
  consultationHref: string;
}

function LivePricePanelComponent({
  content,
  estimate,
  selections,
  quoteHref,
  consultationHref,
}: LivePricePanelProps) {
  const hasLines = estimate.lines.length > 0;
  const copy = content.calculator;

  function handleDownload() {
    if (!estimate.isComplete) return;
    downloadEstimatePdf(content, estimate, selections);
    trackCostCalculatorEvent('download_estimate_clicked', {
      enabled: true,
      total: estimate.estimatedTotal,
    });
  }

  return (
    <aside className="pricing-live-panel" aria-live="polite">
      <p className="pricing-live-eyebrow">{copy.liveBreakdownLabel}</p>

      {hasLines ? (
        <>
          <ul className="pricing-live-lines">
            {estimate.lines.map((line) => (
              <li key={line.id} className="pricing-live-line">
                <span>{line.label}</span>
                <span className={cn('pricing-live-line-amount', line.amount < 0 && 'is-discount')}>
                  {formatInr(line.amount)}
                </span>
              </li>
            ))}
          </ul>

          <div className="pricing-live-total-card">
            <p className="pricing-live-meta-label">
              {estimate.isComplete ? copy.estimatedCostLabel : copy.runningTotalLabel}
            </p>
            <p className="pricing-live-total">
              <AnimatedNumber value={estimate.estimatedTotal} format={formatInr} />
            </p>
          </div>

          <div className="pricing-live-meta-card">
            <p className="pricing-live-meta-label">{copy.annualRenewalLabel}</p>
            <p className="pricing-live-renewal">
              <AnimatedNumber value={estimate.annualRenewal} format={formatInr} />
            </p>
            <p className="pricing-live-hosting-note">{estimate.hostingLabel}</p>
          </div>

          <dl className="pricing-live-facts">
            <div>
              <dt>{copy.timelineLabel}</dt>
              <dd>{estimate.timelineLabel}</dd>
            </div>
            <div>
              <dt>{copy.packageLabel}</dt>
              <dd>{estimate.suggestedPackage}</dd>
            </div>
            {estimate.maintenanceMonthly > 0 ? (
              <div>
                <dt>Maintenance</dt>
                <dd>{formatInr(estimate.maintenanceMonthly)}/month</dd>
              </div>
            ) : null}
          </dl>

          {estimate.recommendedStack.length > 0 ? (
            <div className="pricing-live-stack">
              <p className="pricing-live-meta-label">{copy.stackLabel}</p>
              <ul>
                {estimate.recommendedStack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="pricing-live-disclaimer">{copy.disclaimer}</p>

          <div className="pricing-live-actions">
            <Link
              href={consultationHref}
              className="pricing-cta-primary"
              onClick={() =>
                trackCostCalculatorEvent('book_consultation_clicked', {
                  total: estimate.estimatedTotal,
                })
              }
            >
              {content.actions.bookConsultationLabel}
            </Link>
            <Link
              href={quoteHref}
              className={cn('pricing-cta-secondary', !estimate.isComplete && 'is-disabled')}
              aria-disabled={!estimate.isComplete}
              tabIndex={estimate.isComplete ? 0 : -1}
              onClick={(event) => {
                if (!estimate.isComplete) {
                  event.preventDefault();
                  return;
                }
                trackCostCalculatorEvent('quote_requested', {
                  total: estimate.estimatedTotal,
                });
              }}
            >
              {estimate.isComplete
                ? content.actions.requestQuoteLabel
                : 'Complete all steps for quote'}
            </Link>
            <button
              type="button"
              className="pricing-cta-ghost"
              disabled={!estimate.isComplete}
              aria-disabled={!estimate.isComplete}
              title={
                estimate.isComplete
                  ? content.actions.downloadEstimateLabel
                  : 'Complete all steps to download the estimate PDF'
              }
              onClick={handleDownload}
            >
              {content.actions.downloadEstimateLabel}
            </button>
          </div>
        </>
      ) : (
        <div className="pricing-live-empty">
          <p>{copy.emptyBreakdownTitle}</p>
          <p>{copy.emptyBreakdownHint}</p>
        </div>
      )}
    </aside>
  );
}

export const LivePricePanel = memo(LivePricePanelComponent);
