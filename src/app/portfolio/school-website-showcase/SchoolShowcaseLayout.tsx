'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import SchoolFooter from '@/components/portfolio/school/SchoolFooter';
import SchoolNavbar from '@/components/portfolio/school/SchoolNavbar';

import { SchoolDemoOverlays } from './SchoolDemoOverlays';
import { SchoolDemoProvider } from './SchoolDemoContext';
import { SchoolFloatingActions } from './SchoolFloatingActions';

import './school-showcase.css';

/** Light-only Elevate design — matches reference mockup (no dark theme toggle). */
export default function SchoolShowcaseLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <SchoolDemoProvider>
      <div className="school-showcase flex min-h-screen flex-col school-bg-page">
        <div className="flex min-h-0 flex-1 flex-col">
          <SchoolNavbar />
          <main className="flex-1">{children}</main>
          <SchoolFooter />
          <SchoolDemoOverlays />
          <SchoolFloatingActions />
        </div>
      </div>
    </SchoolDemoProvider>
  );
}
