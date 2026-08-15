import type { Metadata } from 'next';

import ClayCraftPageHeader from '../ClayCraftPageHeader';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Crockery Wala demo terms and conditions.',
};

export default function ClayCraftTermsPage() {
  return (
    <>
      <ClayCraftPageHeader title="Terms & Conditions" crumbs={[{ label: 'Terms' }]} />
      <div className="cc-container cc-section cc-prose">
        <p>
          Crockery Wala is a portfolio ecommerce demonstration. Products, prices, checkout, and
          coupons are simulated. No real purchases or payments are processed.
        </p>
        <p>
          By using this demo you acknowledge that it is provided for showcase and evaluation
          purposes only.
        </p>
      </div>
    </>
  );
}
