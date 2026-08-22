import { getAbsoluteUrl } from './site';
import type { BreadcrumbItem } from './breadcrumbs';

export function buildBreadcrumbListJsonLd(items: readonly BreadcrumbItem[], pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => {
      const position = index + 1;
      const href = item.href ?? (index === items.length - 1 ? pageUrl : undefined);

      return {
        '@type': 'ListItem',
        position,
        name: item.label,
        ...(href ? { item: getAbsoluteUrl(href) } : {}),
      };
    }),
  };
}
