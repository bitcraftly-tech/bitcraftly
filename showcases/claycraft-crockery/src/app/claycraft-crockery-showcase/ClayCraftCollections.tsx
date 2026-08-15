import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { CLAYCRAFT_COLLECTIONS } from './claycraft-catalog';

export default function ClayCraftCollections() {
  return (
    <section
      id="collections"
      className="cc-section cc-collections"
      aria-labelledby="cc-collections-heading"
    >
      <div className="cc-container">
        <h2 id="cc-collections-heading" className="sr-only">
          Featured collections
        </h2>
        <div className="cc-collections__grid" data-cc-reveal-group>
          {CLAYCRAFT_COLLECTIONS.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              className={`cc-collection-card cc-collection-card--${collection.tone}`}
            >
              <div className="cc-collection-card__copy">
                <h3 className="cc-collection-card__title">{collection.title}</h3>
                <p className="cc-collection-card__tagline">{collection.tagline}</p>
                <span className="cc-collection-card__cta">
                  Explore Now
                  <ArrowRight aria-hidden />
                </span>
              </div>
              <div className="cc-collection-card__media">
                <Image
                  src={collection.image}
                  alt={collection.imageAlt}
                  width={800}
                  height={800}
                  sizes="(max-width: 900px) 40vw, 18vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
