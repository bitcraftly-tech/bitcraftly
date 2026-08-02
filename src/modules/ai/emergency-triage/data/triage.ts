import type { AiUrgency } from '@/modules/ai/shared/types';

export type TriageResult = {
  readonly urgency: AiUrgency;
  readonly title: string;
  readonly summary: string;
  readonly actions: readonly string[];
};

export function assessEmergency(input: string): TriageResult {
  const q = input.toLowerCase();

  if (
    /(chest pain|crushing|unconscious|seizure|stroke|severe bleed|can't breathe|cannot breathe|suicidal)/.test(
      q,
    )
  ) {
    return {
      urgency: 'emergency',
      title: 'Emergency — seek care now',
      summary:
        'These symptoms can indicate a time-critical condition. Call emergency services or reach our 24/7 care desk immediately.',
      actions: [
        'Call Clinic & Healthcare emergency line now',
        'Do not drive yourself if chest pain or breathlessness is severe',
        'Share current medications with the responding team',
      ],
    };
  }

  if (/(high fever|persistent vomit|severe pain|dizziness|dehydrat|worsening)/.test(q)) {
    return {
      urgency: 'urgent',
      title: 'Urgent — same-day clinical review',
      summary: 'Symptoms suggest you should be assessed today, not wait for a routine slot.',
      actions: [
        'Book the next available urgent outpatient slot',
        'Hydrate and rest while arranging care',
        'Return to Emergency AI if symptoms escalate',
      ],
    };
  }

  return {
    urgency: 'normal',
    title: 'Normal — scheduled care pathway',
    summary:
      'Based on the description, a routine consultation or telehealth review is appropriate.',
    actions: [
      'Book a General Medicine or relevant speciality appointment',
      'Track symptoms for 24–48 hours',
      'Use Symptom Checker if a fuller triage summary would help',
    ],
  };
}
