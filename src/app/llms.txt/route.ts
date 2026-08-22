import { ROUTES } from '@/constants/navigation';
import { getAbsoluteUrl, getSiteUrl } from '@/lib/seo/site';

export const dynamic = 'force-static';

function buildLlmsTxt(): string {
  const siteUrl = getSiteUrl();

  return `# Bitcraftly

> AI-Powered Digital Engineering Partner. Complete Digital Systems for industry verticals — website, AI, dashboard, analytics, and integrations engineered as one Industry System.

- Site: ${siteUrl}
- Contact: hello@bitcraftly.com
- Location: Noida, Uttar Pradesh, India

## Company

Bitcraftly Technologies Pvt. Ltd. designs and ships Industry Systems: marketing website, admin dashboard, CMS, AI workflows, lead management, analytics, integrations, and a deployment-ready launch path.

Wave 1 industries: Healthcare, Real Estate, Restaurant, and Corporate Services.

## Primary pages

- Home: ${getAbsoluteUrl(ROUTES.home)}
- Services: ${getAbsoluteUrl(ROUTES.services)}
- Solutions: ${getAbsoluteUrl(ROUTES.solutions)}
- Industries: ${getAbsoluteUrl(ROUTES.industries)}
- Work: ${getAbsoluteUrl(ROUTES.work)}
- Blog: ${getAbsoluteUrl(ROUTES.blog)}
- Pricing: ${getAbsoluteUrl(ROUTES.pricing)}
- About: ${getAbsoluteUrl(ROUTES.about)}
- Contact: ${getAbsoluteUrl(ROUTES.contact)}
- FAQ: ${getAbsoluteUrl(ROUTES.resourcesFaq)}

## Feeds

- RSS: ${getAbsoluteUrl('/feed.xml')}
- Sitemap: ${getAbsoluteUrl('/sitemap.xml')}
`;
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
