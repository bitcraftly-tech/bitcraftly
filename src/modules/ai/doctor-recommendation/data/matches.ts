import type { AiDoctorMatch } from '@/modules/ai/shared/types';

function clinicImage(id: string, w: number, h: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&crop=faces,entropy&w=${w}&h=${h}&q=80`;
}

const DOCTORS: readonly AiDoctorMatch[] = [
  {
    id: 'ananya',
    name: 'Dr. Ananya Mehta',
    speciality: 'General Medicine',
    experience: '15+ years',
    rating: 4.9,
    reason: 'Best first review for fever, cough and multi-symptom concerns.',
    image: clinicImage('photo-1559839734-2b71ea197ec2', 400, 400),
  },
  {
    id: 'rahul',
    name: 'Dr. Rahul Kapadia',
    speciality: 'Cardiology',
    experience: '18+ years',
    rating: 4.8,
    reason: 'Recommended when chest discomfort or breathlessness is present.',
    image: clinicImage('photo-1612531386530-97286d97c2d2', 400, 400),
  },
  {
    id: 'nikita',
    name: 'Dr. Nikita Saraf',
    speciality: 'Gynecology',
    experience: '12+ years',
    rating: 4.9,
    reason: 'Matches women’s health, cycle and pregnancy-related queries.',
    image: clinicImage('photo-1643297654416-05795d62e39c', 400, 400),
  },
];

export function recommendDoctor(input: string): AiDoctorMatch {
  const q = input.toLowerCase();
  if (/(chest|heart|bp|blood pressure|palpitation)/.test(q)) return DOCTORS[1]!;
  if (/(pregnan|period|gyn|pcod|pcos)/.test(q)) return DOCTORS[2]!;
  return DOCTORS[0]!;
}
