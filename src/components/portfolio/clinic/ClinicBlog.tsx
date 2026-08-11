'use client';

import Image from 'next/image';
import { ArrowRight, CalendarDays } from 'lucide-react';

import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';

import { CLINIC_POSTS } from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';
import ClinicSectionHeading from './ClinicSectionHeading';

export default function ClinicBlog() {
  return (
    <section id="blog" className="cl-bg-surface" aria-labelledby="clinic-blog-heading">
      <div className="cl-container cl-section">
        <ClinicSectionHeading
          id="clinic-blog-heading"
          title="Latest Health Insights"
          subtitle="Written by our consultants and reviewed before publishing."
        />

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {CLINIC_POSTS.map((post, index) => (
            <ClinicReveal as="li" key={post.id} delay={index * 0.08} className="h-full">
              <article className="cl-card cl-card--lift cl-zoom flex h-full flex-col overflow-hidden">
                <div className="cl-media relative aspect-[16/10]">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 92vw, 30vw"
                    className="object-cover"
                  />
                  <span
                    className="absolute top-3 left-3 rounded-full px-3 py-1 text-[0.6875rem] font-semibold tracking-wide uppercase"
                    style={{
                      background: 'var(--cl-surface)',
                      color: 'var(--cl-primary)',
                      boxShadow: 'var(--cl-shadow-sm)',
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: 'var(--cl-faint)' }}
                  >
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    <time dateTime={post.publishedAt}>{post.date}</time>
                  </p>
                  <h3 className="cl-h3 mt-2">{post.title}</h3>
                  <p className="cl-small mt-2 flex-1">{post.excerpt}</p>
                  <ShowcaseAnchor
                    href="#appointment"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: 'var(--cl-primary)' }}
                    aria-label={`Read more: ${post.title}`}
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </ShowcaseAnchor>
                </div>
              </article>
            </ClinicReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
