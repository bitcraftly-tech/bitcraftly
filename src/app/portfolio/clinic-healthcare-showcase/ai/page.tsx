import type { Metadata } from 'next';

import AiHubClient from './AiHubClient';

export const metadata: Metadata = {
  title: 'AI Healthcare Features',
  description:
    'Explore AI symptom checker, report analyzer, doctor matching, chat assistant, dashboard, diet planner, telemedicine and emergency triage — Clinic & Healthcare showcase by Bitcraftly.',
  openGraph: {
    title: 'AI Healthcare Features | Clinic & Healthcare',
    description:
      'Premium AI healthcare experience platform demos for Bitcraftly portfolio clients.',
    type: 'website',
  },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Clinic & Healthcare AI Features',
  description: 'Interactive AI healthcare demos for the Bitcraftly Clinic & Healthcare showcase.',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'AI Symptom Checker' },
    { '@type': 'ListItem', position: 2, name: 'AI Report Analyzer' },
    { '@type': 'ListItem', position: 3, name: 'AI Doctor Recommendation' },
    { '@type': 'ListItem', position: 4, name: 'AI Health Assistant' },
    { '@type': 'ListItem', position: 5, name: 'AI Health Dashboard' },
    { '@type': 'ListItem', position: 6, name: 'AI Diet Planner' },
    { '@type': 'ListItem', position: 7, name: 'Telemedicine AI' },
    { '@type': 'ListItem', position: 8, name: 'Emergency AI Triage' },
  ],
} as const;

export default function AiHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JSON_LD).replace(/</g, '\\u003c'),
        }}
      />
      <AiHubClient />
    </>
  );
}
