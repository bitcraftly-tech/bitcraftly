import type { AiSymptomResult } from '@/modules/ai/shared/types';

const RESPONSES: readonly AiSymptomResult[] = [
  {
    summary:
      'Your symptoms suggest a respiratory tract concern that usually settles with rest, hydration and clinician review within 24–48 hours.',
    conditions: [
      {
        name: 'Viral upper respiratory infection',
        likelihood: 'High',
        note: 'Common with sore throat, mild fever and cough.',
      },
      {
        name: 'Seasonal allergic rhinitis',
        likelihood: 'Moderate',
        note: 'More likely if sneezing and watery eyes dominate.',
      },
      {
        name: 'Acute bronchitis',
        likelihood: 'Low',
        note: 'Consider if cough persists beyond a week.',
      },
    ],
    department: 'General Medicine',
    urgency: 'normal',
    nextSteps: [
      'Monitor temperature twice daily',
      'Stay hydrated and rest',
      'Book a General Medicine slot if fever lasts over 48 hours',
    ],
  },
  {
    summary:
      'Chest discomfort with breathlessness needs prompt clinical review. AI guidance is not a diagnosis — please speak with Cardiology today.',
    conditions: [
      {
        name: 'Cardiac strain / angina suspicion',
        likelihood: 'Moderate',
        note: 'Especially with exertion-related chest pressure.',
      },
      {
        name: 'Anxiety-related palpitations',
        likelihood: 'Moderate',
        note: 'Often accompanies stress without radiation to the arm.',
      },
      {
        name: 'Musculoskeletal chest wall pain',
        likelihood: 'Low',
        note: 'Worse with movement or pressing the chest wall.',
      },
    ],
    department: 'Cardiology',
    urgency: 'urgent',
    nextSteps: [
      'Avoid strenuous activity until reviewed',
      'Note onset, duration and associated symptoms',
      'Book Cardiology or visit Emergency if pain worsens',
    ],
  },
];

export function analyzeSymptoms(input: string): AiSymptomResult {
  const q = input.toLowerCase();
  if (/(chest|heart|breath|pressure|palpitation)/.test(q)) return RESPONSES[1]!;
  return RESPONSES[0]!;
}
