import Image from 'next/image';

import { RPYTECH } from '@/lib/rpytechShowcaseData';

export default function RpytechHeroPortrait() {
  return (
    <div className="rpytech-hero-img-wrap">
      <Image
        src={RPYTECH.heroImageUrl}
        alt="RPYTech student"
        fill
        className="rpytech-hero-img-photo"
        sizes="(max-width: 1024px) 85vw, 680px"
        priority
      />
    </div>
  );
}
