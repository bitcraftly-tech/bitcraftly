import type { FaqItem } from './faq.types';

export const FAQ_SECTION_ID = 'faq';
export const FAQ_HEADING_ID = 'faq-heading';

export const FAQ_LABEL = 'FAQ';

export const FAQ_HEADING = 'Common questions — seedha jawab';

export const FAQ_DESCRIPTION =
  'Aur sawal ho to WhatsApp par likh dena — English ya Hinglish dono chalega.';

/** Sourced from https://bitcraftly.com/faq */
export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'timeline',
    question: 'Kitne din mein website ready ho sakti hai?',
    answer:
      'Fast-launch packages: Landing Page in 48 hours, Business Website in 5 days, clinic/gym/coach packs in 5–7 days (content ready hona chahiye). Standard Starter/Professional timelines discovery ke baad likh ke confirm hote hain.',
  },
  {
    id: 'react-vs-simple',
    question: 'React/Next.js chahiye ya simple website kaafi hai?',
    answer:
      'Local business ke liye Professional package often enough hai. Startups, SaaS, ya future scale ke liye Premium React/Next.js recommend karte hain.',
  },
  {
    id: 'hinglish-copy',
    question: 'Kya Hindi ya Hinglish copy site par ho sakti hai?',
    answer:
      'Haan — headings SEO-friendly rakhte hain, body copy aapki audience ke hisaab se English, Hindi, ya mix.',
  },
  {
    id: 'ai-chatbot-required',
    question: 'AI chatbot har site par add karna zaroori hai?',
    answer:
      'Nahi. Sirf tab jab FAQs, menu, ya lead qualification mein help kare — warna WhatsApp handoff zyada practical hota hai.',
  },
  {
    id: 'maintenance',
    question: 'Maintenance plan optional hai?',
    answer: 'Haan — launch ke baad ₹2,999/month se updates, fixes, aur monitoring available hai.',
  },
  {
    id: 'remote-clients',
    question: 'Ghaziabad ke bahar clients lete ho?',
    answer:
      'Haan — Delhi NCR (Noida, Gurugram, Delhi, Faridabad) aur poore India + remote international clients; calls/WhatsApp English–Hinglish mix mein comfortable.',
  },
  {
    id: 'google-presence',
    question: 'Google par Bitcraftly dhoondh sakte hain?',
    answer:
      'Haan — Google Business Profile par Bitcraftly search karein (Ghaziabad). Reviews aur updates wahan bhi milte hain.',
  },
  {
    id: 'written-scope',
    question: 'Payment se pehle scope clear milta hai?',
    answer:
      'Haan — written scope and starting estimate before payment. No surprise line items after kickoff. Free 15-minute consultation with the founder.',
  },
  {
    id: 'founder-led',
    question: 'Kaun deliver karta hai — agency team ya founder?',
    answer:
      'Founder-led delivery. Sanjay Kr. Singh owns architecture, build quality, and communication — no sales-to-junior handoff.',
  },
  {
    id: 'get-started',
    question: 'Kaise start karein?',
    answer:
      'Book a free consultation or WhatsApp Sanjay. Share your industry and goals — you’ll get React vs Next.js guidance, timeline, and a written starting estimate.',
  },
] as const;
