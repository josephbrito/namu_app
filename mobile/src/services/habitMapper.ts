import { ApiCategory, ApiFrequency, ApiHabit } from '../interfaces/Api';
import { IHabit, IHabitFormValues, HabitFrequency } from '../interfaces/Habits';
import { toDateKey } from '../utils/calendar';
import { calculateStreak } from '../utils/streak';

const FREQUENCY_TO_API: Record<HabitFrequency, ApiFrequency> = {
  diario: 'diário',
  semanal: 'semanal',
};
const FREQUENCY_FROM_API: Record<ApiFrequency, HabitFrequency> = {
  'diário': 'diario',
  semanal: 'semanal',
};

const CATEGORY_TO_API: Record<'saude' | 'exercicio' | 'alimentacao' | 'mental', ApiCategory> = {
  saude: 'saúde',
  exercicio: 'exercício',
  alimentacao: 'alimentação',
  mental: 'mental',
};
const CATEGORY_FROM_API: Record<ApiCategory, 'saude' | 'exercicio' | 'alimentacao' | 'mental'> = {
  'saúde': 'saude',
  'exercício': 'exercicio',
  'alimentação': 'alimentacao',
  mental: 'mental',
};

export function toHabit(api: ApiHabit): IHabit {
  const frequency = FREQUENCY_FROM_API[api.frequency] ?? 'diario';
  const checkins = (api.checkIns ?? []).map((c:any) => String(c.date).slice(0, 10));

  return {
    id: api.id,
    title: api.title,
    description: api.description ?? '',
    category: CATEGORY_FROM_API[api.category] ?? 'saude',
    frequency,
    checkins,
    streak: calculateStreak(checkins, frequency),
    doneToday: checkins.includes(toDateKey(new Date())),
  };
}

/** Formulário -> corpo esperado pela API */
export function toPayload(values: IHabitFormValues) {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    frequency: FREQUENCY_TO_API[values.frequency as 'diario' | 'semanal'],
    category: CATEGORY_TO_API[values.category as 'saude' | 'exercicio' | 'alimentacao' | 'mental'],
  };
}