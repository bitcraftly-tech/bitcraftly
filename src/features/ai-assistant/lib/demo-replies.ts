/**
 * Scripted demo replies used when OpenAI is not configured.
 * Keep copy visitor-facing (no provider/dev footnotes).
 */
export function buildDemoReply(prompt: string): string {
  const lower = prompt.toLowerCase();

  if (lower.includes('pricing') || lower.includes('cost') || lower.includes('quote')) {
    return [
      'Happy to help with **pricing**.',
      '',
      'Typical Bitcraftly engagements land in clear ranges based on scope:',
      '',
      '- **Marketing sites** — focused pages, SEO, performance',
      '- **Custom software / CRM** — workflows, roles, integrations',
      '- **AI assistants** — grounded answers, handoff, analytics',
      '',
      'For a written estimate, use the [pricing calculator](/pricing#pricing-calculator) or [book a consultation](/contact).',
    ].join('\n');
  }

  if (lower.includes('service') || lower.includes('offer')) {
    return [
      'Bitcraftly builds **AI-powered digital products** for growth-focused teams.',
      '',
      '### Core offerings',
      '',
      '1. Website & web application development',
      '2. Custom software, CRM, and internal tools',
      '3. AI automation, chatbots, and assistants',
      '',
      'Explore [services](/services) or ask about a specific industry.',
    ].join('\n');
  }

  if (lower.includes('ai') || lower.includes('assistant') || lower.includes('chatbot')) {
    return [
      'Our **AI assistants** are designed for real operations — not chat that drifts.',
      '',
      'You get:',
      '',
      '- Grounded answers from your content',
      '- Clear human handoff (chat / WhatsApp)',
      '- Measurable deflection and lead capture',
      '',
      'See [AI assistants](/solutions/ai-assistants) for the product shape.',
    ].join('\n');
  }

  return [
    'Thanks for your question.',
    '',
    `You asked: *${prompt || '—'}*`,
    '',
    'I can help with **pricing**, **services**, or **AI assistants** — pick a suggestion above, or ask in your own words.',
    '',
    '- [Contact](/contact) for a scoped proposal',
    '- [Work](/work) for case studies',
  ].join('\n');
}
