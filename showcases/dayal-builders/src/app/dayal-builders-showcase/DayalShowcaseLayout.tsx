import type { ReactNode } from 'react';

import DayalSiteRoot from '@bitcraftly/showcase-dayal-builders/components/DayalSiteRoot';
import {
  dayalCaudex,
  dayalPlayfair,
  dayalSans,
} from '@bitcraftly/showcase-dayal-builders/lib/fonts';

import '@bitcraftly/showcase-dayal-builders/styles/dayal.css';
import '@bitcraftly/showcase-dayal-builders/styles/dayal-estate.css';

export default function DayalShowcaseLayout({ children }: { children: ReactNode }) {
  return (
    <DayalSiteRoot
      className={`${dayalCaudex.variable} ${dayalPlayfair.variable} ${dayalSans.variable}`}
    >
      {children}
    </DayalSiteRoot>
  );
}
