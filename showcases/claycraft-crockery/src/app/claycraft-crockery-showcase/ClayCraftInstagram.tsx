'use client';

import { ArrowRight, Instagram } from 'lucide-react';
import Image from 'next/image';

import {
  CLAYCRAFT_INSTAGRAM_HANDLE,
  CLAYCRAFT_INSTAGRAM_POSTS,
  CLAYCRAFT_INSTAGRAM_URL,
} from './claycraft-instagram-data';
import { useClayCraftDemo } from './ClayCraftDemoContext';
import { newTabProps } from '@/lib/newTabLink';

export default function ClayCraftInstagram() {
  const { openLightbox } = useClayCraftDemo();

  return (
    <section
      id="instagram"
      className="cc-section cc-instagram"
      aria-labelledby="cc-instagram-heading"
    >
      <div className="cc-container">
        <div className="cc-instagram__head" data-cc-reveal>
          <h2 id="cc-instagram-heading" className="cc-section-title cc-instagram__title">
            Follow Us{' '}
            <a
              href={CLAYCRAFT_INSTAGRAM_URL}
              className="cc-instagram__handle"
              {...newTabProps(CLAYCRAFT_INSTAGRAM_URL)}
            >
              {CLAYCRAFT_INSTAGRAM_HANDLE}
            </a>
          </h2>
          <a
            href={CLAYCRAFT_INSTAGRAM_URL}
            className="cc-instagram__view-all"
            {...newTabProps(CLAYCRAFT_INSTAGRAM_URL)}
          >
            View on Instagram
            <ArrowRight aria-hidden />
          </a>
        </div>

        <ul className="cc-instagram__grid" data-cc-reveal-group>
          {CLAYCRAFT_INSTAGRAM_POSTS.slice(0, 6).map((post) => (
            <li key={post.id}>
              <button
                type="button"
                className="cc-instagram__item"
                onClick={() => openLightbox(post.image, post.alt)}
                aria-label={`View ${post.alt}`}
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  width={768}
                  height={512}
                  sizes="(max-width: 720px) 50vw, 14vw"
                />
                <span className="cc-instagram__overlay" aria-hidden>
                  <Instagram />
                </span>
              </button>
            </li>
          ))}
          <li>
            <a
              href={CLAYCRAFT_INSTAGRAM_URL}
              className="cc-instagram__more"
              {...newTabProps(CLAYCRAFT_INSTAGRAM_URL)}
            >
              <Instagram aria-hidden />
              <span>See More on Instagram</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
