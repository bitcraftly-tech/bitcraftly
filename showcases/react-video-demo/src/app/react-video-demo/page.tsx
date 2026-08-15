import type { Metadata } from 'next';

import PortfolioShowcaseLayout from '@bitcraftly/showcase-shared/PortfolioShowcaseLayout';

import ReactVideoDemoContent from './ReactVideoDemoContent';

export const metadata: Metadata = {
  title: 'React Video Portfolio Demo | Bitcraftly',
  description:
    'Premium OTT-style streaming UI showcase built with React.js, HLS.js, Video.js, and CSS Grid — a fictional demo project by Bitcraftly.',
};

export default function ReactVideoDemoPage() {
  return (
    <PortfolioShowcaseLayout themeId="video">
      <ReactVideoDemoContent />
    </PortfolioShowcaseLayout>
  );
}
