import { ICheckins } from "./Checkins";

export interface IHabit {
    id: number;
    title: string;
    description: string;
    frequency: string;
    category: string;
    created_at?: string;
    streak: number;
    doneToday: boolean;
    checkins: string[];
}

export type HabitFrequency = 'diario' | 'semanal';

export interface IHabitCardProps {
  habit: IHabit;
  onPress: (habit: IHabit) => void;
  onToggleCheckin: (habit: IHabit) => void;
}

export interface IHabitFormValues {
  title: string;
  description: string;
  frequency: string;
  category: 'saúde' | 'exercício' | 'alimentação' | 'mental';
}

export type Category = 'saude' | 'exercicio' | 'alimentacao' | 'mental';