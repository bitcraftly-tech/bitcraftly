'use client';

import Image from 'next/image';
import { ArrowRight, CalendarDays } from 'lucide-react';

import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';

import { CLINIC_POSTS } from '@bitcraftly/showcase-clinic-healthcare/app/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';
import ClinicSectionHeading from './ClinicSectionHeading';

export default function ClinicBlog() {
  return (
    <section id="blog" className="cl-blog cl-bg-surface" aria-labelledby="clinic-blog-heading">
      <div className="cl-container cl-section">
        <ClinicSectionHeading
          id="clinic-blog-heading"
          title="Latest Health Insights"
          subtitle="Written by our consultants and reviewed before publishing."
        />

        <ul className="cl-blog__grid">
          {CLINIC_POSTS.map((post, index) => (
            <ClinicReveal as="li" key={post.id} delay={index * 0.06} className="h-full">
              <article className="cl-card cl-card--lift cl-zoom cl-blog-card">
                <div className="cl-media cl-blog-card__media">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 92vw, 32vw"
                    className="object-cover"
                  />
                  <span className="cl-blog-card__badge">{post.category}</span>
                </div>

                <div className="cl-blog-card__body">
                  <p className="cl-blog-card__date">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    <time dateTime={post.publishedAt}>{post.date}</time>
                  </p>
                  <h3 className="cl-blog-card__title">{post.title}</h3>
                  <p className="cl-blog-card__excerpt">{post.excerpt}</p>
                  <ShowcaseAnchor
                    href="#appointment"
                    className="cl-blog-card__link"
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
