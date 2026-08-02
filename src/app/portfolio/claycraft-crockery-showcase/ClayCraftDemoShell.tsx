'use client';

import dynamic from 'next/dynamic';

import { ClayCraftDemoProvider } from './ClayCraftDemoContext';

const ClayCraftCartDrawer = dynamic(() => import('./ClayCraftCartDrawer'), { ssr: false });
const ClayCraftSearchModal = dynamic(() => import('./ClayCraftSearchModal'), { ssr: false });
const ClayCraftQuickViewModal = dynamic(() => import('./ClayCraftQuickViewModal'), { ssr: false });
const ClayCraftAccountModal = dynamic(() => import('./ClayCraftAccountModal'), { ssr: false });
const ClayCraftLightbox = dynamic(() => import('./ClayCraftLightbox'), { ssr: false });

export default function ClayCraftDemoShell({ children }: { children: React.ReactNode }) {
  return (
    <ClayCraftDemoProvider>
      {children}
      <ClayCraftCartDrawer />
      <ClayCraftSearchModal />
      <ClayCraftQuickViewModal />
      <ClayCraftAccountModal />
      <ClayCraftLightbox />
    </ClayCraftDemoProvider>
  );
}
