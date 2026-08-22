export interface FaqJsonLdItem {
  readonly question: string;
  readonly answer: string;
}

export function buildFaqPageJsonLd(pageUrl: string, items: readonly FaqJsonLdItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
