'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import './rpytech-showcase.css';
import RpytechFloatingActions from './RpytechFloatingActions';
import RpytechFooter from './RpytechFooter';
import RpytechNavbar from './RpytechNavbar';

export default function RpytechShowcaseLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="rpytech-showcase flex min-h-screen flex-col bg-white text-slate-800">
      <RpytechNavbar />
      <main className="flex-1">{children}</main>
      <RpytechFloatingActions />
      <RpytechFooter />
    </div>
  );
}
