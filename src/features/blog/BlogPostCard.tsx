import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getBlogAuthorById, getBlogCategoryById } from '@/content/blog';
import type { BlogPostSummary } from '@/content/blog';
import { cn } from '@/lib/cn';
import { formatBlogDate, getBlogPostHref } from './blog.utils';

interface BlogPostCardProps {
  post: BlogPostSummary;
  priority?: boolean;
  className?: string;
}

export function BlogPostCard({ post, priority = false, className }: BlogPostCardProps) {
  const category = getBlogCategoryById(post.categoryId);
  const author = getBlogAuthorById(post.authorId);
  const href = getBlogPostHref(post.slug);

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-background',
        'transition-colors hover:border-primary/30',
        className,
      )}
    >
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden bg-surface no-underline"
        aria-label={`Read ${post.title}`}
      >
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="blog-post-card__body flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-[8px]">
          {category ? (
            <Badge variant="primary" size="sm">
              {category.label}
            </Badge>
          ) : null}
          <span className="font-sans text-[12px] text-muted-foreground">
            {post.readingTimeMinutes} min read
          </span>
        </div>

        <h3 className="m-0 font-sans text-[18px] font-semibold leading-[1.35] tracking-[-0.02em] text-foreground">
          <Link href={href} className="text-inherit no-underline hover:text-primary">
            {post.title}
          </Link>
        </h3>

        <p className="m-0 flex-1 font-sans text-[14px] leading-[1.65] text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="blog-post-card__meta flex flex-wrap items-center gap-x-[10px] gap-y-[4px] font-sans text-[12px] text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          {author ? (
            <>
              <span aria-hidden>•</span>
              <span>{author.name}</span>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}
