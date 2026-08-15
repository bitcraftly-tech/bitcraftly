import type { Metadata } from 'next';
import Rpy2Page from './Rpy2Page';

export const metadata: Metadata = {
  title: 'RPY Technical & Training Services | Portfolio Demo | Bitcraftly',
  description:
    'Interactive portfolio showcase of a vocational training institute website — courses, certifications, placement & contact sections.',
  robots: { index: false, follow: false },
};

export default function RpyTechShowcaseDemoPage() {
  return <Rpy2Page />;
}
