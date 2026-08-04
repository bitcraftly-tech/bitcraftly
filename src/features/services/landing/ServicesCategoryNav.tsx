'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/container';
import { SERVICE_CATEGORIES } from './services-landing.content';

export function ServicesCategoryNav() {
  const [activeId, setActiveId] = useState(SERVICE_CATEGORIES[0]?.id ?? '');

  useEffect(() => {
    const sections = SERVICE_CATEGORIES.map((category) =>
      document.getElementById(`service-category-${category.id}`),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (top?.target.id) {
          setActiveId(top.target.id.replace('service-category-', ''));
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.55],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sl-catnav" aria-label="Service categories">
      <Container>
        <div className="sl-catnav__scroller">
          {SERVICE_CATEGORIES.map((category) => {
            const isCurrent = activeId === category.id;

            return (
              <Link
                key={category.id}
                href={`#service-category-${category.id}`}
                className="sl-catnav__link"
                aria-current={isCurrent ? 'true' : undefined}
              >
                {category.title}
              </Link>
            );
          })}
        </div>
      </Container>
    </nav>
  );
}
