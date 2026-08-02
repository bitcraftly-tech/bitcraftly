'use client';

import { Bus, Calendar, Download, GraduationCap, Users, Wallet } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import { useSchoolDemo } from './SchoolDemoContext';
import { QUICK_ACTIONS } from './school-demo-data';

const ICONS = {
  graduation: GraduationCap,
  wallet: Wallet,
  users: Users,
  bus: Bus,
  download: Download,
  calendar: Calendar,
} as const;

export default function SchoolQuickActions() {
  const { showToast, scrollToEnquiry, scrollToSection, setModalType, handleUsefulLink } =
    useSchoolDemo();

  const handle = (id: string, label: string) => {
    switch (id) {
      case 'admission':
        scrollToEnquiry();
        break;
      case 'fees':
        handleUsefulLink({
          type: 'toast',
          message:
            'Fee structure 2026-27 · Playgroup ₹48k · Grade I–V ₹72k · transport extra · brochure on enquiry',
        });
        break;
      case 'portal':
        showToast('Parent Portal · demo login (production links to your ERP)');
        break;
      case 'transport':
        scrollToEnquiry();
        showToast('Transport routes · GPS fleet · share your locality on enquiry');
        break;
      case 'downloads':
        setModalType('circular');
        break;
      case 'calendar':
        scrollToSection('news-events');
        showToast('Academic calendar · term dates in circulars');
        break;
      default:
        showToast(`${label} · opens on production site`);
    }
  };

  return (
    <section className="school-bg-surface border-y school-border py-10">
      <div className={CONTAINER}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {QUICK_ACTIONS.map((a) => {
            const Icon = ICONS[a.icon as keyof typeof ICONS];
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => handle(a.id, a.label)}
                className="school-card-hover school-glass group flex flex-col items-center rounded-2xl p-4 text-center sm:p-5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--school-accent-soft)] text-[var(--school-orange)] transition group-hover:bg-[var(--school-orange)] group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <p className="mt-3 text-sm font-bold text-[var(--school-navy)]">{a.label}</p>
                <p className="school-text-muted mt-1 text-[10px] leading-tight sm:text-xs">
                  {a.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
