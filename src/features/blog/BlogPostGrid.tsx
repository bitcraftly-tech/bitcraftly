import type { BlogPostSummary } from '@/content/blog';
import { BlogPostCard } from './BlogPostCard';

interface BlogPostGridProps {
  posts: readonly BlogPostSummary[];
}

export function BlogPostGrid({ posts }: BlogPostGridProps) {
  if (posts.length === 0) {
    return (
      <p className="m-0 rounded-[16px] border border-dashed border-border bg-surface/50 px-[20px] py-[28px] text-center font-sans text-[15px] text-muted-foreground">
        No articles match your filters. Try another category or clear search.
      </p>
    );
  }

  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-[20px] p-0 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, index) => (
        <li key={post.slug} className="min-w-0">
          <BlogPostCard post={post} priority={index < 2} />
        </li>
      ))}
    </ul>
  );
}
