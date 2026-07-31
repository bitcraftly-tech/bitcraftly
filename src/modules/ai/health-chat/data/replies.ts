import type { AiChatMessage } from '@/modules/ai/shared/types';

export const CHAT_SUGGESTIONS = [
  'What departments do you have?',
  'How do I book an appointment?',
  'Is telehealth available today?',
  'What should I bring for a blood test?',
] as const;

export const CHAT_WELCOME: AiChatMessage = {
  id: 'welcome',
  role: 'assistant',
  text: 'Namaste — I am the Clinic & Healthcare assistant. Ask about departments, appointments, telehealth or reports. This is a showcase demo, not a diagnosis.',
};

export function replyToChat(input: string): string {
  const q = input.toLowerCase();
  if (/(appoint|book|slot)/.test(q)) {
    return 'You can book from the Appointment section on the homepage, or say a department and preferred date and I will guide you to the form.';
  }
  if (/(department|special)/.test(q)) {
    return 'We offer General Medicine, Cardiology, Gynecology, Orthopedics, Pediatrics, Dermatology, ENT and Diagnostics under one roof.';
  }
  if (/(tele|video|online)/.test(q)) {
    return 'Video consultations are available with select consultants. Open Telemedicine AI to check availability and book a call.';
  }
  if (/(report|blood|cbc|mri)/.test(q)) {
    return 'Use AI Report Analyzer to upload a sample report — the demo explains CBC / imaging findings in plain language.';
  }
  if (/(emergency|urgent|chest)/.test(q)) {
    return 'For emergencies, use Emergency AI Triage or call our 24/7 care desk immediately. Do not wait on chat for critical symptoms.';
  }
  return 'I can help with appointments, departments, telehealth and report guidance. Try one of the suggested questions below.';
}
