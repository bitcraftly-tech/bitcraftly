import { CheckCircle2, Quote, Star } from 'lucide-react';
import Image from 'next/image';

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import {
  TESTIMONIALS,
  WHY_FAMILY_IMAGE,
  WHY_TRUST,
} from '@bitcraftly/showcase-dayal-builders/lib/data';

const RATING_AVERAGE =
  TESTIMONIALS.reduce((total, item) => total + item.rating, 0) / TESTIMONIALS.length;

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('');
}

export default function DayalWhyTestimonialsRow() {
  return (
    <section className="dayal-section dayal-section--white" aria-label="Why Dayal and testimonials">
      <div className="dayal-container">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12">
          <DayalReveal className="min-w-0">
            <p className="dayal-eyebrow">Why Dayal Builders</p>
            <div className="dayal-gold-line mt-3" aria-hidden />
            <h2 className="dayal-section-title mt-4 leading-tight">
              Building foundations. Creating futures.
            </h2>
            <p className="dayal-body mt-3 max-w-md">
              Quality construction, prime locations, and a customer-first process — every project.
            </p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {WHY_TRUST.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 rounded-xl border border-[#0b1633]/8 bg-[#f8f6f2] px-3 py-2.5"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#c8a46b]" aria-hidden />
                  <span className="text-sm font-medium leading-snug text-[#0b1633]">{point}</span>
                </li>
              ))}
            </ul>
          </DayalReveal>

          <DayalReveal delay={0.08} className="min-w-0">
            <div className="dayal-media-skeleton dayal-media-zoom relative aspect-[16/11] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(11,22,51,0.12)] ring-1 ring-[#0b1633]/10">
              <Image
                src={WHY_FAMILY_IMAGE}
                alt="Dayal Builders — quality homes in Jamshedpur"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </DayalReveal>
        </div>

        <div id="testimonials" className="mt-10 scroll-mt-28 border-t border-[#0b1633]/8 pt-8">
          <DayalReveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="dayal-eyebrow">Satisfied customers</p>
              <h2 className="dayal-section-title mt-3 leading-tight">What our customers say</h2>
            </div>

            <p className="flex items-center gap-2.5 rounded-xl border border-[#c8a46b]/35 bg-[#c8a46b]/10 px-3.5 py-2">
              <span className="flex gap-0.5 text-[#c8a46b]" aria-hidden>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <span className="text-sm font-bold text-[#0b1633]">
                {RATING_AVERAGE.toFixed(1)}
                <span className="ml-1.5 font-medium text-[#5c6478]">
                  from {TESTIMONIALS.length} reviews
                </span>
              </span>
            </p>
          </DayalReveal>

          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <DayalReveal
                as="li"
                key={testimonial.name}
                delay={0.06 * index}
                className="relative flex flex-col rounded-2xl border border-[#0b1633]/8 bg-[#f8f6f2] p-5 transition hover:border-[#c8a46b]/45 hover:bg-white"
              >
                <Quote className="absolute right-4 top-4 h-7 w-7 text-[#c8a46b]/25" aria-hidden />

                <p
                  className="flex gap-0.5 text-[#c8a46b]"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: testimonial.rating }).map((_, star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-current" aria-hidden />
                  ))}
                </p>

                <blockquote className="dayal-serif mt-3 text-[0.95rem] leading-relaxed text-[#0b1633]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <footer className="mt-4 flex items-center gap-3 border-t border-[#0b1633]/8 pt-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b1633] text-xs font-bold leading-none text-white"
                    aria-hidden
                  >
                    {initials(testimonial.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[#0b1633]">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs text-[#5c6478]">{testimonial.location}</span>
                  </span>
                </footer>
              </DayalReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
