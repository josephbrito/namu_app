import { IHabitFormValues } from '../interfaces/Habits';

export type HabitFormErrors = Partial<Record<'title' | 'category', string>>;

export function validateHabit(values: IHabitFormValues): HabitFormErrors {
  const errors: HabitFormErrors = {};

  if (!values.title.trim()) {
    errors.title = 'Informe um título para o hábito.';
  } else if (values.title.trim().length > 100) {
    errors.title = 'O título deve ter no máximo 100 caracteres.';
  }

  if (!values.category) {
    errors.category = 'Escolha uma categoria para continuar.';
  }

  return errors;
}