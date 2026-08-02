export interface LegalSection {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export interface LegalDocument {
  readonly eyebrow: string;
  readonly title: string;
  readonly titleHighlight: string;
  readonly description: string;
  readonly updatedLabel: string;
  readonly sections: readonly LegalSection[];
  readonly contactNote?: string;
}

/** Mirrored from https://bitcraftly.com/privacy (May 2026). */
export const PRIVACY_DOCUMENT: LegalDocument = {
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  titleHighlight: 'Privacy',
  description:
    'How Bitcraftly collects, uses, and protects information shared through our website and services.',
  updatedLabel: 'Last updated: May 2026',
  sections: [
    {
      id: 'data-collection',
      title: 'Data Collection',
      body: 'We collect basic contact and project-related information shared through forms, consultations and communication channels to provide our services.',
    },
    {
      id: 'how-we-use-data',
      title: 'How We Use Data',
      body: 'We use collected information to communicate with clients, manage projects, provide support, and improve our services.',
    },
    {
      id: 'data-storage',
      title: 'Data Storage',
      body: 'We take reasonable steps to protect client information using secure modern technologies and access controls.',
    },
    {
      id: 'third-party',
      title: 'Third Party Services',
      body: 'We may use trusted third-party services such as hosting, analytics, communication and AI tools to support our operations.',
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      body: 'You may request access, correction, export, or deletion of your personal information where applicable law allows. We handle verified requests as soon as we reasonably can.',
    },
    {
      id: 'contact',
      title: 'Contact Us',
      body: 'For privacy-related questions or requests, contact us at privacy@bitcraftly.com.',
    },
  ],
  contactNote: 'privacy@bitcraftly.com',
};

/** Mirrored from https://bitcraftly.com/terms (May 2026). */
export const TERMS_DOCUMENT: LegalDocument = {
  eyebrow: 'Legal',
  title: 'Terms of Service',
  titleHighlight: 'Terms',
  description: 'Terms that apply when you use Bitcraftly’s website and engage our services.',
  updatedLabel: 'Last updated: May 2026',
  sections: [
    {
      id: 'acceptance',
      title: 'Acceptance',
      body: "By using Bitcraftly's website and services, you agree to these terms. If you disagree, please do not use our site or engage our services.",
    },
    {
      id: 'services',
      title: 'Services',
      body: 'Bitcraftly is a website and app development agency. We provide website development, ecommerce solutions, mobile app UI/UX design, ongoing maintenance, and custom digital solutions for businesses, typically on a project or engagement basis as agreed in writing.',
    },
    {
      id: 'payments',
      title: 'Payments & Refunds',
      body: 'Project payments are milestone-based unless agreed otherwise in your quote or contract. Advance payments are non-refundable once project work has started, except where required by applicable law.',
    },
    {
      id: 'prohibited',
      title: 'Prohibited Use',
      body: 'Clients may not use Bitcraftly services for illegal, harmful or fraudulent activities. You agree not to misuse deliverables (including code or integrations) in ways that violate law or third-party rights.',
    },
    {
      id: 'termination',
      title: 'Termination',
      body: 'We may suspend or stop work where these terms are breached, invoices remain unpaid, or there is misuse. Where reasonable, we will give notice before ending an engagement, except in cases of abuse, illegality, or serious security risk.',
    },
    {
      id: 'liability',
      title: 'Liability',
      body: 'To the fullest extent permitted by law, Bitcraftly is not liable for indirect or consequential losses. Our total liability for any claim relating to our services is limited to the fees you paid Bitcraftly for the services directly related to that claim in the twelve months before you notified us.',
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      body: 'These terms are governed by the laws of India. Disputes are subject to the jurisdiction of courts in Jharkhand, unless a written agreement between you and Bitcraftly says otherwise.',
    },
  ],
};
