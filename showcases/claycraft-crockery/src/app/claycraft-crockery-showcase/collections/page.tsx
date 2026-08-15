import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import ClayCraftPageHeader from '../ClayCraftPageHeader';
import { CLAYCRAFT_COLLECTIONS } from '../claycraft-catalog';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore Crockery Wala curated tableware collections.',
};

export default function ClayCraftCollectionsPage() {
  return (
    <>
      <ClayCraftPageHeader
        title="Collections"
        description="Editorial collections designed around mood, material, and occasion."
        crumbs={[{ label: 'Collections' }]}
      />
      <div className="cc-container cc-section">
        <div className="cc-collections__grid">
          {CLAYCRAFT_COLLECTIONS.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              className={`cc-collection-card cc-collection-card--${collection.tone}`}
            >
              <div className="cc-collection-card__copy">
                <h2 className="cc-collection-card__title">{collection.title}</h2>
                <p className="cc-collection-card__tagline">{collection.tagline}</p>
                <span className="cc-collection-card__cta">Explore Now</span>
              </div>
              <div className="cc-collection-card__media">
                <Image src={collection.image} alt={collection.imageAlt} width={800} height={800} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
