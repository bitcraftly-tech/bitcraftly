import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CLAYCRAFT_PRODUCTS, getProductBySlug } from '../../claycraft-products';
import { ccProductPath } from '../../claycraft-paths';
import ClayCraftProductDetailClient from './ClayCraftProductDetailClient';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CLAYCRAFT_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product' };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.image }],
    },
    alternates: { canonical: ccProductPath(product.slug) },
  };
}

export default async function ClayCraftProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClayCraftProductDetailClient product={product} />
    </>
  );
}
