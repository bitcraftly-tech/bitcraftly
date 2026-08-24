import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { JsonLdScript } from '@/components/patterns/json-ld';
import { PageShell } from '@/components/patterns/marketing-layout';
import { ROUTES, NAV_ACTIONS } from '@/constants/navigation';
import { buildBlogBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildBlogListingJsonLd } from './blog-schema';
import { queryBlogPosts } from './blog.query';
import type { BlogCategoryId } from '@/content/blog';
import { BlogHero } from './BlogHero';
import { BlogPagination } from './BlogPagination';
import { BlogPostGrid } from './BlogPostGrid';
import { cn } from '@/lib/cn';

export interface BlogLandingPageProps {
  category?: BlogCategoryId | 'all';
  tag?: string;
  q?: string;
  page?: number;
}

export function BlogLandingPage({ category = 'all', tag, q, page = 1 }: BlogLandingPageProps) {
  const result = queryBlogPosts({ category, tag, q, page });
  const breadcrumbs = buildBlogBreadcrumbs();

  return (
    <PageShell className="blog-page">
      <JsonLdScript data={buildBlogListingJsonLd(result.items)} />
      <BlogHero breadcrumbs={breadcrumbs} activeCategory={category} query={q ?? ''} />

      <Section
        id="blog-articles"
        spacing="lg"
        background="default"
        aria-labelledby="blog-articles-heading"
        className="scroll-mt-[100px]"
      >
        <div className="mb-[16px] flex flex-wrap items-end justify-between gap-[12px]">
          <p id="blog-articles-heading" className="m-0 font-sans text-[14px] text-muted-foreground">
            {result.total} article{result.total === 1 ? '' : 's'}
            {tag ? ` tagged “${tag}”` : null}
            {q ? ` matching “${q}”` : null}
          </p>
          {tag || q ? (
            <Link
              href={ROUTES.blog}
              className="font-sans text-[13px] font-medium text-primary no-underline hover:underline"
            >
              Clear filters
            </Link>
          ) : null}
        </div>

        <BlogPostGrid posts={result.items} />
        <BlogPagination
          page={result.page}
          totalPages={result.totalPages}
          category={category}
          q={q}
        />
      </Section>

      <Section spacing="md" background="surface" className="border-t border-border/70">
        <div className="case-study-cta-card rounded-[18px] border border-border bg-background card-padding">
          <div className="case-study-cta-card__copy max-w-xl">
            <h2 className="m-0 font-sans text-[22px] font-semibold tracking-[-0.02em] text-foreground">
              Building something ambitious?
            </h2>
            <p className="m-0 font-sans text-[14px] leading-[1.65] text-muted-foreground">
              Talk to Bitcraftly about AI products, Next.js platforms, and performance-minded
              marketing systems.
            </p>
          </div>
          <div className="case-study-cta-card__actions">
            <Link
              href={NAV_ACTIONS.freeConsultation.href}
              className={cn(
                'inline-flex h-[44px] items-center justify-center rounded-[12px] px-[18px]',
                'bg-primary font-sans text-[14px] font-semibold text-primary-foreground no-underline',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              )}
            >
              {NAV_ACTIONS.freeConsultation.label}
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

export const BLOG_LANDING_META = {
  title: 'Blog | Bitcraftly',
  description:
    'Engineering and product insights on AI development, Next.js, React, web performance, and SEO from the Bitcraftly team.',
  path: ROUTES.blog,
  keywords: [
    'Bitcraftly blog',
    'AI development',
    'Next.js architecture',
    'React patterns',
    'web performance',
    'technical SEO',
  ],
  image: '/opengraph-image.webp',
} as const;
