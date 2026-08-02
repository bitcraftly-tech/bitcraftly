import type { ReactNode } from 'react';

import DayalSiteRoot from '@/components/dayal/DayalSiteRoot';
import { dayalCaudex } from '@/lib/dayal/fonts';

import '@/app/dayal-builders/dayal.css';

export default function DayalShowcaseLayout({ children }: { children: ReactNode }) {
  return <DayalSiteRoot className={dayalCaudex.variable}>{children}</DayalSiteRoot>;
}
