'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import { BLOG, BLOG_PAGE_URL } from '@bitcraftly/showcase-dayal-builders/lib/data';

export default function DayalBlog() {
  return (
    <section id="blog" className="dayal-section dayal-section--cream border-t border-[#0b1633]/6">
      <div className="dayal-container">
        <DayalReveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="dayal-section__header min-w-0">
              <p className="dayal-eyebrow">Insights</p>
              <div className="dayal-gold-line mt-3" aria-hidden />
              <h2 className="dayal-section-title mt-4">Real estate & lifestyle</h2>
              <p className="dayal-body mt-3 max-w-2xl">
                Updates on construction, design, and new Dayal Builders projects in Jamshedpur.
              </p>
            </div>
            <a
              href={BLOG_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="dayal-btn-primary inline-flex shrink-0 items-center gap-2 self-start sm:self-auto"
            >
              View all articles
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </DayalReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-12">
          {BLOG.map((post, i) => (
            <DayalReveal key={post.id} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#0b1633]/10 bg-white transition hover:border-[#c8a46b]/35 hover:shadow-[0_16px_40px_-28px_rgba(11,22,51,0.35)]">
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dayal-media-zoom relative block aspect-[16/10] overflow-hidden bg-[#f8f6f2]"
                  aria-label={`Read article: ${post.title}`}
                >
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </a>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
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

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5c6478] line-clamp-3">
                    {post.excerpt}
                  </p>

                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0b1633] transition hover:text-[#c8a46b]"
                  >
                    Read article
                    <span className="sr-only">: {post.title}</span>
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-0.5"
                      aria-hidden
                    />
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
