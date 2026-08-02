'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import ClinicAskAiFab from '@/components/portfolio/clinic/ClinicAskAiFab';
import ClinicBackToTopThumbler from '@/components/portfolio/clinic/ClinicBackToTopThumbler';
import ClinicEmergencyWhatsApp from '@/components/portfolio/clinic/ClinicEmergencyWhatsApp';
import ClinicFooter from '@/components/portfolio/clinic/ClinicFooter';
import ClinicNavbar from '@/components/portfolio/clinic/ClinicNavbar';
import { ShowcaseScopedThemeProvider } from '@/components/providers/ShowcaseScopedThemeProvider';
import {
  clearPendingScrollTarget,
  getPendingScrollTarget,
  scrollToElementWithRetry,
} from '@/lib/scrollToMarketingSection';

import './clinic-showcase.css';

export default function ClinicShowcaseLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const sectionId = getPendingScrollTarget(pathname);
    if (!sectionId) return;
    return scrollToElementWithRetry(sectionId, {
      onSuccess: clearPendingScrollTarget,
    });
  }, [pathname]);

  return (
    <ShowcaseScopedThemeProvider showcaseId="clinic" className="clinic-showcase">
      <div id="top" className="flex min-h-screen flex-col" tabIndex={-1}>
        <ClinicNavbar />
        <main className="flex-1">{children}</main>
        <ClinicFooter />
        <ClinicAskAiFab />
        <ClinicEmergencyWhatsApp />
        <ClinicBackToTopThumbler />
      </div>
    </ShowcaseScopedThemeProvider>
  );
}
