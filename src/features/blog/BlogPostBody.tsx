import type { BlogBlock } from "@/content/blog";
import { cn } from "@/lib/cn";

interface BlogPostBodyProps {
  blocks: readonly BlogBlock[];
}

export function BlogPostBody({ blocks }: BlogPostBodyProps) {
  return (
    <div className="blog-prose flex flex-col gap-[18px]">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={`p-${index}`}
                className="m-0 font-sans text-[16px] leading-[1.75] text-foreground/90"
              >
                {block.text}
              </p>
            );
          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={block.id}
                  id={block.id}
                  className="m-0 scroll-mt-[96px] pt-[8px] font-sans text-[26px] font-semibold tracking-[-0.02em] text-foreground"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3
                key={block.id}
                id={block.id}
                className="m-0 scroll-mt-[96px] pt-[4px] font-sans text-[20px] font-semibold tracking-[-0.01em] text-foreground"
              >
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul
                key={`list-${index}`}
                className="m-0 list-disc space-y-[8px] pl-[22px] font-sans text-[16px] leading-[1.7] text-foreground/90"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <aside
                key={`callout-${index}`}
                className={cn(
                  "rounded-[14px] border border-primary/20 bg-primary/5 px-[16px] py-[14px]",
                  "font-sans text-[15px] leading-[1.65] text-foreground",
                )}
              >
                {block.text}
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
