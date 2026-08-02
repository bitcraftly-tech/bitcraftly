import type { Metadata } from 'next';

import SchoolShowcaseLayout from './SchoolShowcaseLayout';
import SchoolWebsiteShowcaseDemo from './SchoolWebsiteShowcaseDemo';

export const metadata: Metadata = {
  title: 'Elevate International School · CBSE Website Showcase | Bitcraftly',
  description:
    'CBSE senior secondary school website demo — admissions, facilities, house system, circulars, gallery & enquiry forms.',
};

export default function SchoolWebsiteShowcasePage() {
  return (
    <SchoolShowcaseLayout>
      <SchoolWebsiteShowcaseDemo />
    </SchoolShowcaseLayout>
  );
}
