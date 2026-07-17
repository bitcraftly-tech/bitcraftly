import Link from "next/link";
import { cn } from "@/lib/cn";
import { buildListingHref } from "./BlogHero";
import type { BlogCategoryId } from "@/content/blog";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
  category?: BlogCategoryId | "all";
  q?: string;
}

export function BlogPagination({
  page,
  totalPages,
  category = "all",
  q,
}: BlogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-[28px] flex items-center justify-between gap-[12px]"
    >
      {prevDisabled ? (
        <span className="font-sans text-[14px] text-muted-foreground/60">
          Previous
        </span>
      ) : (
        <Link
          href={buildListingHref({ category, q, page: page - 1 })}
          className="font-sans text-[14px] font-medium text-primary no-underline hover:underline"
          rel="prev"
        >
          Previous
        </Link>
      )}

      <p className="m-0 font-sans text-[13px] text-muted-foreground">
        Page {page} of {totalPages}
      </p>

      {nextDisabled ? (
        <span className="font-sans text-[14px] text-muted-foreground/60">
          Next
        </span>
      ) : (
        <Link
          href={buildListingHref({ category, q, page: page + 1 })}
          className={cn(
            "font-sans text-[14px] font-medium text-primary no-underline hover:underline",
          )}
          rel="next"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
