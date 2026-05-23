"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

import DayalReveal from "@/components/dayal/DayalReveal";
import { BLOG, BLOG_PAGE_URL } from "@/lib/dayal/data";

export default function DayalBlog() {
  return (
    <section id="blog" className="scroll-mt-20 border-t border-[#0b1633]/6 bg-white py-12 sm:scroll-mt-24 sm:py-16 lg:py-20">
      <div className="dayal-container">
        <DayalReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <h2 className="dayal-section-title mt-0">Real Estate &amp; Lifestyle Blog</h2>
              <p className="dayal-body mt-3 max-w-2xl">
                Get the latest updates on quality construction, innovation, and new projects from Dayal
                Builders.
              </p>
            </div>
            <a
              href={BLOG_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="dayal-btn-primary inline-flex shrink-0 items-center gap-2 self-start sm:self-auto"
            >
              View all blogs
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </DayalReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-12">
          {BLOG.map((post, i) => (
            <DayalReveal key={post.id} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#0b1633]/12 bg-white transition hover:border-[#c8a46b]/35 hover:shadow-[0_12px_40px_rgba(11,22,51,0.08)]">
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[16/10] overflow-hidden bg-[#f8f6f2]"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </a>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="text-xs text-[#5c6478]">
                    <time dateTime="2025-09-27">{post.date}</time>
                    <span aria-hidden> · </span>
                    {post.readTime}
                  </p>

                  <h3 className="dayal-serif mt-3 text-lg font-semibold leading-snug text-[#0b1633] sm:text-xl">
                    <a
                      href={post.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-[#c8a46b]"
                    >
                      {post.title}
                    </a>
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5c6478] line-clamp-3">{post.excerpt}</p>

                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0b1633] transition hover:text-[#c8a46b]"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </div>
              </article>
            </DayalReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
