import Link from "next/link";
import { JsonLdScript } from "@/components/patterns/json-ld";
import { PageShell } from "@/components/patterns/marketing-layout";
import { Section } from "@/components/ui/section";
import type { BlogPost } from "@/content/blog";
import { ROUTES } from "@/constants/navigation";
import { buildBlogBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { buildBlogPostJsonLd } from "./blog-schema";
import { getRelatedPosts } from "./blog.query";
import { BlogPostBody } from "./BlogPostBody";
import { BlogPostHeader } from "./BlogPostHeader";
import { BlogRelatedPosts } from "./BlogRelatedPosts";
import { BlogTableOfContents } from "./BlogTableOfContents";

interface BlogPostDetailPageProps {
  post: BlogPost;
}

export function BlogPostDetailPage({ post }: BlogPostDetailPageProps) {
  const breadcrumbs = buildBlogBreadcrumbs([{ label: post.title }]);
  const related = getRelatedPosts(post);

  return (
    <PageShell className="blog-page">
      <JsonLdScript data={buildBlogPostJsonLd(post)} />

      <Section spacing="lg" background="default">
        <div className="grid grid-cols-1 gap-[28px] lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-[36px]">
          <article aria-labelledby="blog-post-heading">
            <BlogPostHeader post={post} breadcrumbs={breadcrumbs} />
            <div className="mt-[28px]">
              <BlogPostBody blocks={post.body} />
            </div>

            <div className="mt-[32px] rounded-[14px] border border-border bg-surface/40 px-[16px] py-[14px]">
              <Link
                href={ROUTES.blog}
                className="font-sans text-[14px] font-medium text-primary no-underline hover:underline"
              >
                ← Back to blog
              </Link>
            </div>

            <BlogRelatedPosts posts={related} />
          </article>

          <aside className="lg:pt-[8px]">
            <div className="lg:sticky lg:top-[96px]">
              <BlogTableOfContents post={post} />
            </div>
          </aside>
        </div>
      </Section>
    </PageShell>
  );
}
