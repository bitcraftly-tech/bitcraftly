import { cn } from "@/lib/cn";
import { getPostHeadingIds } from "./blog.utils";
import type { BlogPost } from "@/content/blog";

interface BlogTableOfContentsProps {
  post: BlogPost;
  className?: string;
}

export function BlogTableOfContents({ post, className }: BlogTableOfContentsProps) {
  const headings = getPostHeadingIds(post);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "rounded-[16px] border border-border bg-surface/40 p-[16px]",
        className,
      )}
    >
      <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        On this page
      </p>
      <ol className="mt-[12px] m-0 list-none space-y-[8px] p-0">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block font-sans text-[13px] leading-[1.45] text-muted-foreground no-underline hover:text-primary",
                heading.level === 3 && "pl-[12px]",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
