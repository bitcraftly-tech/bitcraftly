import Link from 'next/link';

import { ccPath } from './claycraft-paths';

export default function ClayCraftPageHeader({
  title,
  description,
  crumbs,
}: {
  title: string;
  description?: string;
  crumbs?: readonly { label: string; href?: string }[];
}) {
  return (
    <header className="cc-page-hero">
      <div className="cc-container">
        {crumbs && crumbs.length > 0 ? (
          <nav className="cc-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href={ccPath('/')}>Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <Link href={c.href}>{c.label}</Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <h1 className="cc-section-title">{title}</h1>
        {description ? <p className="cc-section-desc">{description}</p> : null}
      </div>
    </header>
  );
}
