import { ArrowRight, BadgeCheck, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { CLAYCRAFT_TESTIMONIALS } from './claycraft-testimonials-data';
import { ccPath } from './claycraft-paths';

const AVERAGE_RATING = 4.9;
const REVIEW_COUNT_LABEL = '1,240+';

function Stars({ rating }: { rating: number }) {
  return (
    <span className="cc-testimonial-stars" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i));
        return (
          <span key={i} className="cc-testimonial-star">
            <Star className="cc-testimonial-star__bg" />
            {fill > 0 ? (
              <span className="cc-testimonial-star__fill" style={{ width: `${fill * 100}%` }}>
                <Star />
              </span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}

export default function ClayCraftTestimonials() {
  return (
    <section
      id="testimonials"
      className="cc-section cc-testimonials"
      aria-labelledby="cc-testimonials-heading"
    >
      <div className="cc-container">
        <div className="cc-testimonials__head" data-cc-reveal>
          <div className="cc-testimonials__intro">
            <p className="cc-testimonials__eyebrow">Reviews</p>
            <h2 id="cc-testimonials-heading" className="cc-section-title">
              What Our Customers Say
            </h2>
            <p className="cc-testimonials__score">
              <Stars rating={AVERAGE_RATING} />
              <span>
                <strong>{AVERAGE_RATING}</strong> average from {REVIEW_COUNT_LABEL} verified buyers
              </span>
            </p>
          </div>
          <Link href={ccPath('/faq')} className="cc-testimonials__view-all">
            View All Reviews
            <ArrowRight aria-hidden />
          </Link>
        </div>

        <ul className="cc-testimonials__grid" data-cc-reveal-group>
          {CLAYCRAFT_TESTIMONIALS.map((item) => (
            <li key={item.id} className="cc-testimonial-card">
              <span className="cc-testimonial-card__mark" aria-hidden>
                &rdquo;
              </span>
              <p className="cc-testimonial-card__rating">
                <Stars rating={item.rating} />
                <span className="sr-only">{`Rated ${item.rating} out of 5`}</span>
              </p>
              <blockquote className="cc-quote">
                <p>{item.quote}</p>
              </blockquote>
              <p className="cc-testimonial-card__product">
                <ShoppingBag aria-hidden />
                Purchased <span>{item.product}</span>
              </p>
              <div className="cc-testimonial-card__author">
                <Image
                  src={item.avatar}
                  alt=""
                  width={64}
                  height={64}
                  className="cc-testimonial-card__avatar"
                />
                <div>
                  <p className="cc-quote__name">
                    {item.name}
                    <span className="cc-testimonial-card__verified" title="Verified buyer">
                      <BadgeCheck aria-hidden />
                      <span className="sr-only">Verified buyer</span>
                    </span>
                  </p>
                  <p className="cc-quote__role">{item.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
