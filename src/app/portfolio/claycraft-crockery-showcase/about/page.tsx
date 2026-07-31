import type { Metadata } from 'next';
import Link from 'next/link';

import ClayCraftPageHeader from '../ClayCraftPageHeader';
import { CLAYCRAFT_BLOG } from '../claycraft-content-data';
import { ccPath } from '../claycraft-paths';

export const metadata: Metadata = {
  title: 'About',
  description: 'The Crockery Wala story — elegant tableware for beautiful everyday dining.',
};

export default function ClayCraftAboutPage() {
  return (
    <>
      <ClayCraftPageHeader
        title="Our Story"
        description="Crockery Wala is a premium tableware house dedicated to warm materials, quiet forms, and lasting craft."
        crumbs={[{ label: 'About' }]}
      />
      <div className="cc-container cc-section cc-prose">
        <p>
          We design dinnerware intended for real life — morning coffee, weeknight pasta, and long
          weekend dinners with friends. Every glaze, rim, and silhouette is considered for beauty
          and durability.
        </p>
        <p>
          This storefront is a Bitcraftly portfolio demonstration. Browse products, use cart and
          wishlist, and explore the full experience — without a real backend or payment gateway.
        </p>
        <h2>From the journal</h2>
        <ul className="cc-blog-list">
          {CLAYCRAFT_BLOG.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
              <span className="cc-product-meta">{post.date}</span>
            </li>
          ))}
        </ul>
        <Link href={ccPath('/shop')} className="cc-btn cc-btn--primary">
          Shop the collection
        </Link>
      </div>
    </>
  );
}
