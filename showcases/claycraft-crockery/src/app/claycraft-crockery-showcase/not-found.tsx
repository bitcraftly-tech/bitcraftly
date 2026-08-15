import Link from 'next/link';

import { ccPath } from './claycraft-paths';

export default function ClayCraftNotFound() {
  return (
    <div className="cc-container cc-section cc-empty">
      <h1 className="cc-section-title">Page not found</h1>
      <p>The page you’re looking for doesn’t exist in this Crockery Wala demo.</p>
      <Link href={ccPath('/')} className="cc-btn cc-btn--primary">
        Back to home
      </Link>
    </div>
  );
}
