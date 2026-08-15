import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { CLAYCRAFT_CATEGORIES, type ClayCraftCategory } from './claycraft-catalog';

/** Four categories promoted directly under the hero, each with an editorial line. */
const FEATURED: readonly { id: string; tagline: string }[] = [
  { id: 'glassware', tagline: 'Crystal clear elegance' },
  { id: 'dinner-sets', tagline: 'Crafted for every meal' },
  { id: 'serveware', tagline: 'Serve in style' },
  { id: 'table-decor', tagline: 'Details that impress' },
];

export default function ClayCraftHeroCategories() {
  const cards = FEATURED.map((entry) => ({
    tagline: entry.tagline,
    category: CLAYCRAFT_CATEGORIES.find((cat) => cat.id === entry.id),
  })).filter((card): card is { tagline: string; category: ClayCraftCategory } =>
    Boolean(card.category),
  );

  return (
    <nav className="cc-hero-cats" aria-label="Shop by category">
      <div className="cc-container">
        <ul className="cc-hero-cats__grid">
          {cards.map(({ category, tagline }) => (
            <li key={category.id}>
              <Link href={category.href} className="cc-hero-cats__card">
                <span className="cc-hero-cats__body">
                  <span className="cc-hero-cats__label">{category.title}</span>
                  <span className="cc-hero-cats__tagline">{tagline}</span>
                  <span className="cc-hero-cats__cta">
                    Shop Now
                    <ArrowRight aria-hidden />
                  </span>
                </span>
                <span className="cc-hero-cats__media">
                  <Image src={category.image} alt="" width={240} height={240} sizes="160px" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
