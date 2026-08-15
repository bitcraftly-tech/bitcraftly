'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [
  {
    src: '/rpy-tech/gallery/gallery-5.jpg',
    alt: 'RPY Tech classroom training',
    label: 'Training Session',
    cat: 'Training',
  },
  {
    src: '/rpy-tech/gallery/gallery-6.jpg',
    alt: 'RPY Tech workshop session',
    label: 'Workshop',
    cat: 'Workshop',
  },
  {
    src: '/rpy-tech/gallery/gallery-7.jpg',
    alt: 'RPY Tech students in safety gear',
    label: 'Industrial Safety',
    cat: 'Safety',
  },
  {
    src: '/rpy-tech/gallery/gallery-8.jpg',
    alt: 'RPY Tech group training',
    label: 'Group Training',
    cat: 'Training',
  },
  {
    src: '/rpy-tech/gallery/gallery-9.jpg',
    alt: 'RPY Tech height safety training',
    label: 'Height Safety',
    cat: 'Safety',
  },
  {
    src: '/rpy-tech/gallery/gallery-10.jpg',
    alt: 'RPY Tech field training',
    label: 'Field Training',
    cat: 'Training',
  },
  {
    src: '/rpy-tech/gallery/gallery-11.jpg',
    alt: 'RPY Tech certification session',
    label: 'Certification',
    cat: 'Awards',
  },
];

const CATS = ['All', ...Array.from(new Set(IMAGES.map((i) => i.cat)))];

function GalleryTile({
  img,
  index,
  onClick,
}: {
  img: (typeof IMAGES)[number];
  index: number;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      role="listitem"
      className="rpyv2-gallery-tile"
      onClick={onClick}
      aria-label={`View ${img.label}`}
    >
      {/* Shimmer skeleton — hidden once image loads */}
      {!loaded && (
        <div className="rpyv2-gallery-shimmer" aria-hidden>
          <div className="rpyv2-gallery-shimmer-sweep" />
          <div className="rpyv2-gallery-shimmer-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        </div>
      )}

      {/* Actual image */}
      <div className={`rpyv2-gallery-tile-img${loaded ? ' rpyv2-gallery-tile-img--loaded' : ''}`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="rpyv2-gallery-tile-photo"
          sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Hover overlay — only when loaded */}
      {loaded && (
        <div className="rpyv2-gallery-tile-overlay" aria-hidden>
          <div className="rpyv2-gallery-tile-zoom">
            <ZoomIn size={18} />
          </div>
          <div className="rpyv2-gallery-tile-info">
            <span className="rpyv2-gallery-tile-cat">{img.cat}</span>
            <p className="rpyv2-gallery-tile-label">{img.label}</p>
          </div>
        </div>
      )}
    </button>
  );
}

export default function Rpy2Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === 'All' ? IMAGES : IMAGES.filter((i) => i.cat === filter);

  const lbPrev = () =>
    setLightbox((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const lbNext = () => setLightbox((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <section className="rpyv2-gallery" id="gallery" aria-label="Our gallery">
      <div className="rpyv2-container">
        {/* Header */}
        <div className="rpyv2-gallery-head">
          <div>
            <span className="rpyv2-gallery-eyebrow">Our Work</span>
            <h2 className="rpyv2-gallery-title">Gallery</h2>
          </div>
          <p className="rpyv2-gallery-desc">
            Real moments from our training sessions and student achievements.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="rpyv2-gallery-filters" role="tablist" aria-label="Filter gallery">
          {CATS.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              className={`rpyv2-gallery-filter${filter === cat ? ' rpyv2-gallery-filter--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="rpyv2-gallery-grid" role="list">
          {filtered.map((img, i) => (
            <GalleryTile key={img.src} img={img} index={i} onClick={() => setLightbox(i)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="rpyv2-gallery-lightbox"
          role="dialog"
          aria-modal
          onClick={() => setLightbox(null)}
        >
          <button
            className="rpyv2-gallery-lbclose"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>

          <button
            className="rpyv2-gallery-lbnav rpyv2-gallery-lbnav--prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              lbPrev();
            }}
          >
            <ChevronLeft size={28} />
          </button>

          <div className="rpyv2-gallery-lbimg" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              fill
              className="rpyv2-gallery-lbimg-inner"
              sizes="92vw"
              priority
            />
          </div>

          <button
            className="rpyv2-gallery-lbnav rpyv2-gallery-lbnav--next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              lbNext();
            }}
          >
            <ChevronRight size={28} />
          </button>

          <div className="rpyv2-gallery-lbfooter" onClick={(e) => e.stopPropagation()}>
            <p className="rpyv2-gallery-lbcaption">{filtered[lightbox].label}</p>
            <span className="rpyv2-gallery-lbcount">
              {lightbox + 1} / {filtered.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
