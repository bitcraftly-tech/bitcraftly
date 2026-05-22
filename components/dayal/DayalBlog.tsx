"use client";

import { ArrowRight } from "lucide-react";

import DayalReveal from "@/components/dayal/DayalReveal";
import { BLOG } from "@/lib/dayal/data";

export default function DayalBlog() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
            Insights
          </p>
          <h2 className="dayal-serif mt-3 text-3xl font-semibold text-[#0b1633] sm:text-4xl">
            Real Estate & Lifestyle Blog
          </h2>
        </DayalReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {BLOG.map((post, i) => (
            <DayalReveal key={post.title} delay={i * 0.08}>
              <article className="group flex h-full flex-col rounded-2xl border border-[#0b1633]/8 bg-[#f8f6f2] p-6 transition hover:border-[#c8a46b]/40 hover:shadow-lg">
                <time className="text-xs font-medium text-[#c8a46b]">{post.date}</time>
                <h3 className="dayal-serif mt-3 text-xl font-semibold text-[#0b1633] group-hover:text-[#c8a46b]">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5c6478]">{post.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#0b1633]">
                  Read more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </article>
            </DayalReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
