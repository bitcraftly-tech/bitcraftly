import type { Metadata } from 'next';

import ClayCraftPageHeader from '../ClayCraftPageHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Crockery Wala demo privacy policy.',
};

export default function ClayCraftPrivacyPage() {
  return (
    <>
      <ClayCraftPageHeader title="Privacy Policy" crumbs={[{ label: 'Privacy Policy' }]} />
      <div className="cc-container cc-section cc-prose">
        <p>
          This Crockery Wala experience is a local demonstration. Form submissions and cart data stay in
          your browser session (local storage) and are not sent to a real backend.
        </p>
        <p>No personal data is stored on Bitcraftly servers for this demo storefront.</p>
      </div>
    </>
  );
}
