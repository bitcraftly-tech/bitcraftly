import { ALL_RESOURCES } from '@/constants/resources';
import type { NavLinkItem } from '@/constants/nav.types';
import { ROUTES } from '@/constants/navigation';
import { buildResourcesBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildBreadcrumbListJsonLd } from '@/lib/seo/json-ld-breadcrumbs';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import { RESOURCES_LANDING } from './resources.content';

function hasHref(item: NavLinkItem): item is NavLinkItem & { href: string } {
  return Boolean(item.href);
}

export function buildResourcesListingJsonLd() {
  const pageUrl = getAbsoluteUrl(ROUTES.resources);
  const breadcrumbs = buildResourcesBreadcrumbs();
  const items = ALL_RESOURCES.filter(hasHref);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${RESOURCES_LANDING.title} ${RESOURCES_LANDING.titleHighlight}`,
        description: RESOURCES_LANDING.description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            url: getAbsoluteUrl(item.href),
          })),
        },
      },
      buildBreadcrumbListJsonLd(breadcrumbs, pageUrl),
    ],
  };
}
