import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import {
  getBlogAuthorById,
  getBlogCategoryById,
  type BlogPost,
} from "@/content/blog";
import { ROUTES } from "@/constants/navigation";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import { estimateReadingTimeMinutes, formatBlogDate } from "./blog.utils";

interface BlogPostHeaderProps {
  post: BlogPost;
  breadcrumbs: readonly BreadcrumbItem[];
}

export function BlogPostHeader({ post, breadcrumbs }: BlogPostHeaderProps) {
  const author = getBlogAuthorById(post.authorId);
  const category = getBlogCategoryById(post.categoryId);
  const readingTime = estimateReadingTimeMinutes(post.body);

  return (
    <header className="flex flex-col gap-[18px]">
      <MarketingBreadcrumbs items={breadcrumbs} />

      <div className="flex flex-wrap items-center gap-[8px]">
        {category ? (
          <Link
            href={`${ROUTES.blog}?category=${category.id}`}
            className="no-underline"
          >
            <Badge variant="primary" size="sm">
              {category.label}
            </Badge>
          </Link>
        ) : null}
        <span className="font-sans text-[13px] text-muted-foreground">
          {readingTime} min read
        </span>
      </div>

      <h1
        id="blog-post-heading"
        className="m-0 max-w-3xl font-sans text-[34px] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[42px]"
      >
        {post.title}
      </h1>

      <p className="m-0 max-w-2xl font-sans text-[17px] leading-[1.7] text-muted-foreground">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap items-center gap-[12px]">
        {author ? (
          <div className="flex items-center gap-[10px]">
            <span className="relative h-[40px] w-[40px] overflow-hidden rounded-full border border-border bg-surface">
              <Image
                src={author.avatarSrc}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <div className="min-w-0">
              <p className="m-0 font-sans text-[14px] font-semibold text-foreground">
                {author.name}
              </p>
              <p className="m-0 font-sans text-[12px] text-muted-foreground">
                {author.role}
              </p>
            </div>
          </div>
        ) : null}

        <span className="hidden h-[28px] w-px bg-border sm:block" aria-hidden />

        <time
          dateTime={post.publishedAt}
          className="font-sans text-[13px] text-muted-foreground"
        >
          Published {formatBlogDate(post.publishedAt)}
        </time>
      </div>

      <div className="relative mt-[8px] aspect-[21/9] overflow-hidden rounded-[18px] border border-border bg-surface">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1100px"
          className="object-cover"
        />
      </div>

      {post.tags.length > 0 ? (
        <ul className="m-0 flex list-none flex-wrap gap-[8px] p-0" aria-label="Tags">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`${ROUTES.blog}?tag=${encodeURIComponent(tag)}`}
                className="rounded-full border border-border px-[10px] py-[4px] font-sans text-[12px] text-muted-foreground no-underline hover:text-foreground"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
