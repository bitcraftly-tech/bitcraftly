import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ClayCraftPageHeader from '../../ClayCraftPageHeader';
import { ClayCraftProductCard } from '../../ClayCraftProductCard';
import { CLAYCRAFT_COLLECTIONS, getCollectionById } from '../../claycraft-catalog';
import { getProductsByCollection } from '../../claycraft-products';
import { ccCollectionPath, ccPath } from '../../claycraft-paths';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CLAYCRAFT_COLLECTIONS.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionById(slug);
  if (!collection) return { title: 'Collection' };
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: ccCollectionPath(collection.id) },
  };
}

export default async function ClayCraftCollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionById(slug);
  if (!collection) notFound();
  const products = getProductsByCollection(collection.id);

  return (
    <>
      <ClayCraftPageHeader
        title={collection.title}
        description={collection.description}
        crumbs={[
          { label: 'Collections', href: ccPath('/collections') },
          { label: collection.title },
        ]}
      />
      <div className="cc-container cc-section">
        {products.length === 0 ? (
          <p className="cc-empty">Products coming soon in this collection.</p>
        ) : (
          <div className="cc-bestsellers__grid">
            {products.map((p) => (
              <ClayCraftProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
