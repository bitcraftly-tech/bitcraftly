'use client';

import dynamic from 'next/dynamic';
import type { ServiceCardModel } from './services.types';

interface ServicesCatalogSearchLoaderProps {
  readonly groups: ReadonlyArray<{
    readonly id: string;
    readonly items: readonly ServiceCardModel[];
  }>;
}

const ServicesCatalogSearch = dynamic(
  () => import('./ServicesCatalogSearch').then((mod) => mod.ServicesCatalogSearch),
  {
    ssr: false,
    loading: () => (
      <div
        className="services-search-section min-h-[14rem] border-b border-border/40 bg-background"
        aria-hidden
      />
    ),
  },
);

/** Defers catalog filter JS until after first paint. */
export function ServicesCatalogSearchLoader({ groups }: ServicesCatalogSearchLoaderProps) {
  return <ServicesCatalogSearch groups={groups} />;
}
