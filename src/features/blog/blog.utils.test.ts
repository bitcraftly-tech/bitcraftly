import { describe, expect, it } from "vitest";
import {
  estimateReadingTimeMinutes,
  formatBlogDate,
  getBlogPostHref,
} from "@/features/blog/blog.utils";

describe("blog.utils", () => {
  it("builds canonical blog hrefs", () => {
    expect(getBlogPostHref("example-post")).toBe("/blog/example-post");
  });

  it("estimates reading time from body blocks", () => {
    const body = [
      {
        type: "paragraph" as const,
        text: Array.from({ length: 400 }, () => "word").join(" "),
      },
    ];
    expect(estimateReadingTimeMinutes(body)).toBeGreaterThanOrEqual(1);
  });

  it("formats ISO dates for display", () => {
    const formatted = formatBlogDate("2026-07-10");
    expect(formatted.length).toBeGreaterThan(0);
    expect(formatted).toMatch(/2026|Jul|July|10/);
  });
});
