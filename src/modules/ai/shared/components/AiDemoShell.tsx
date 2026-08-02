'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

/**
 * Shared chrome for every Clinic & Healthcare AI demo page.
 * Keeps demos inside the showcase theme without rewriting the marketing shell.
 */
export default function AiDemoShell({ title, description, children }: Props) {
  return (
    <div className="cl-container cl-section">
      <nav aria-label="AI demo breadcrumb" className="mb-6">
        <Link
          href="/portfolio/clinic-healthcare-showcase/ai"
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[var(--cl-primary)]"
          style={{ color: 'var(--cl-muted)' }}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All AI Features
        </Link>
      </nav>

      <header className="max-w-3xl">
        <p className="cl-eyebrow">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Clinic AI demo
        </p>
        <h1 className="cl-h2 mt-3">{title}</h1>
        <p className="cl-body mt-3">{description}</p>
        <p
          className="cl-small mt-3 rounded-xl border px-3 py-2"
          style={{ borderColor: 'var(--cl-border)' }}
        >
          Educational showcase only — not a medical diagnosis or emergency service.
        </p>
      </header>

      <div className="mt-8">{children}</div>
    </div>
  );
}
