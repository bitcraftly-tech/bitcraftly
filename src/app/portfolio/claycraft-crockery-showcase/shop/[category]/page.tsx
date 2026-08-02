import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import ClayCraftPageHeader from '../../ClayCraftPageHeader';
import ClayCraftShopClient from '../../ClayCraftShopClient';
import { getCategoryById, CLAYCRAFT_CATEGORIES } from '../../claycraft-catalog';
import { ccCategoryPath, ccPath } from '../../claycraft-paths';

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CLAYCRAFT_CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryById(category);
  if (!cat) return { title: 'Category' };
  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: ccCategoryPath(cat.id) },
  };
}

export default async function ClayCraftCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryById(category);
  if (!cat) notFound();

  return (
    <>
      <ClayCraftPageHeader
        title={cat.title}
        description={cat.description}
        crumbs={[{ label: 'Shop', href: ccPath('/shop') }, { label: cat.title }]}
      />
      <Suspense fallback={<div className="cc-container cc-section">Loading…</div>}>
        <ClayCraftShopClient
          categoryId={cat.id}
          heading={cat.title}
          description={cat.description}
        />
      </Suspense>
    </>
  );
}
