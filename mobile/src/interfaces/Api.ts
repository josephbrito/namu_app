import { ICheckins } from './Checkins';

export type ApiFrequency = 'diário' | 'semanal';
export type ApiCategory = 'saúde' | 'exercício' | 'alimentação' | 'mental';

export interface ApiHabit {
  id: number;
  title: string;
  description: string | null;
  frequency: ApiFrequency;
  category: ApiCategory;
  checkIns?: ICheckins[];
}

export interface ApiResponse<T> {
  data: T;
}