import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { getIndustryHref } from '@/constants/industries';
import { INDUSTRIES_CATALOG, INDUSTRIES_LANDING } from './industries.content';
import './industries.css';

const PANEL_ROW_LIMIT = 5;

/**
 * Corporate / Trust hero panel — the coverage record for the Industries landing.
 *
 * Featured verticals are shown as a real table so the headline claim is
 * verifiable at a glance: which domains, for which organizations, in how long.
 * Rows without a week range are skipped — the column only reads as evidence
 * while every value stays comparable.
 */
export function IndustriesHeroPanel() {
  const panel = INDUSTRIES_LANDING.heroPanel;
  const rows = INDUSTRIES_CATALOG.filter(
    (industry) => industry.featured && industry.projectDuration.includes('weeks'),
  ).slice(0, PANEL_ROW_LIMIT);

  return (
    <aside className="industries-hero__panel" aria-labelledby="industries-hero-panel-title">
      <header className="industries-hero__panel-head">
        <p id="industries-hero-panel-title" className="industries-hero__panel-title">
          {panel.title}
        </p>
        <p className="industries-hero__panel-count">
          <span className="industries-hero__panel-count-value">{INDUSTRIES_CATALOG.length}</span>
          {panel.countLabel}
        </p>
      </header>

      <table className="industries-hero__panel-table">
        <caption className="sr-only">{panel.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{panel.verticalColumn}</th>
            <th scope="col">{panel.timelineColumn}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((industry) => (
            <tr key={industry.slug}>
              <th scope="row">
                <Link className="industries-hero__panel-row" href={getIndustryHref(industry.slug)}>
                  <span className="industries-hero__panel-icon" aria-hidden>
                    <Icon name={industry.icon} size="sm" className="h-[15px] w-[15px]" />
                  </span>
                  <span className="industries-hero__panel-copy">
                    <span className="industries-hero__panel-label">{industry.label}</span>
                    <span className="industries-hero__panel-meta">{industry.companySize}</span>
                  </span>
                </Link>
              </th>
              <td className="industries-hero__panel-span">{industry.projectDuration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="industries-hero__panel-foot">
        <p className="industries-hero__panel-note">
          <Icon name="shield" size="sm" aria-hidden className="h-[13px] w-[13px]" />
          {panel.note}
        </p>
        <Link href={panel.moreHref} className="industries-hero__panel-more">
          {panel.moreLabel}
          <Icon name="arrow-up-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
        </Link>
      </footer>
    </aside>
  );
}
