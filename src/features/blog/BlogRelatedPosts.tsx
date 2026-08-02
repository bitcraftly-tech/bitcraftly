import type { BlogPostSummary } from '@/content/blog';
import { BlogPostCard } from './BlogPostCard';

interface BlogRelatedPostsProps {
  posts: readonly BlogPostSummary[];
}

export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-posts-heading" className="mt-[40px]">
      <h2
        id="related-posts-heading"
        className="m-0 font-sans text-[24px] font-semibold tracking-[-0.02em] text-foreground"
      >
        Related articles
      </h2>
      <ul className="mt-[18px] m-0 grid list-none grid-cols-1 gap-[18px] p-0 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <BlogPostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
