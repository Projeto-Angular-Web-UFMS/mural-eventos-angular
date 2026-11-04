export type EventCategory = 'Palestra' | 'Workshop' | 'Minicurso' | 'Hackathon';

export const EVENT_CATEGORIES: readonly EventCategory[] = [
  'Palestra',
  'Workshop',
  'Minicurso',
  'Hackathon',
];

export interface CourseEvent {
  id: string;
  titulo: string;
  descricao?: string;
  data: string;
  local: string;
  categoria: EventCategory;
}
