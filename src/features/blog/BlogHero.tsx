import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { Section } from "@/components/ui/section";
import { BLOG_CATEGORIES } from "@/content/blog";
import type { BlogCategoryId } from "@/content/blog";
import { ROUTES } from "@/constants/navigation";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import { cn } from "@/lib/cn";

interface BlogHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
  activeCategory?: BlogCategoryId | "all";
  query?: string;
}

function buildListingHref(options: {
  category?: BlogCategoryId | "all";
  q?: string;
  page?: number;
}): string {
  const params = new URLSearchParams();
  if (options.category && options.category !== "all") {
    params.set("category", options.category);
  }
  if (options.q?.trim()) {
    params.set("q", options.q.trim());
  }
  if (options.page && options.page > 1) {
    params.set("page", String(options.page));
  }
  const qs = params.toString();
  return qs ? `${ROUTES.blog}?${qs}` : ROUTES.blog;
}

export function BlogHero({
  breadcrumbs,
  activeCategory = "all",
  query = "",
}: BlogHeroProps) {
  return (
    <Section
      spacing="lg"
      background="default"
      className="border-b border-border/70 bg-background"
    >
      <div className="flex max-w-3xl flex-col gap-[16px]">
        <MarketingBreadcrumbs items={breadcrumbs} />
        <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
          Blog
        </p>
        <h1
          id="blog-page-heading"
          className="m-0 font-sans text-[36px] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[44px]"
        >
          Engineering notes for builders shipping real products
        </h1>
        <p className="m-0 max-w-2xl font-sans text-[16px] leading-[1.7] text-muted-foreground">
          Practical writing on AI development, Next.js, React, performance, and
          SEO — from the Bitcraftly delivery desk.
        </p>
      </div>

      <form
        action={ROUTES.blog}
        method="get"
        role="search"
        className="mt-[28px] flex w-full max-w-xl flex-col gap-[10px] sm:flex-row"
      >
        {activeCategory !== "all" ? (
          <input type="hidden" name="category" value={activeCategory} />
        ) : null}
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <input
          id="blog-search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Search articles…"
          className={cn(
            "h-[44px] w-full rounded-[12px] border border-border bg-background px-[14px]",
            "font-sans text-[14px] text-foreground placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          )}
        />
        <button
          type="submit"
          className={cn(
            "inline-flex h-[44px] shrink-0 items-center justify-center rounded-[12px] px-[18px]",
            "bg-primary font-sans text-[14px] font-semibold text-primary-foreground no-underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          )}
        >
          Search
        </button>
      </form>

      <nav
        aria-label="Blog categories"
        className="mt-[20px] flex flex-wrap gap-[8px]"
      >
        <Link
          href={buildListingHref({ q: query || undefined })}
          className={cn(
            "rounded-full border px-[12px] py-[6px] font-sans text-[13px] font-medium no-underline",
            activeCategory === "all"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
          aria-current={activeCategory === "all" ? "page" : undefined}
        >
          All
        </Link>
        {BLOG_CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={buildListingHref({
              category: category.id,
              q: query || undefined,
            })}
            className={cn(
              "rounded-full border px-[12px] py-[6px] font-sans text-[13px] font-medium no-underline",
              activeCategory === category.id
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
            aria-current={activeCategory === category.id ? "page" : undefined}
          >
            {category.label}
          </Link>
        ))}
      </nav>
    </Section>
  );
}

export { buildListingHref };
