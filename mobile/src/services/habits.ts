import { api } from '../api/client';
import { ApiHabit, ApiResponse } from '../interfaces/Api';
import { IHabitFormValues } from '../interfaces/Habits';
import { toPayload } from './habitMapper';

export async function fetchHabits(): Promise<ApiHabit[]> {
  const { data } = await api.get<ApiResponse<ApiHabit[]>>('/habits');
  return data.data;
}

export async function createHabit(values: IHabitFormValues) {
  await api.post('/habits', toPayload(values));
}

export async function updateHabit(id: number, values: IHabitFormValues) {
  await api.put(`/habits/${id}`, toPayload(values));
}

export async function deleteHabit(id: number) {
  await api.delete(`/habits/${id}`);
}

export async function createCheckin(habitId: number, date: string, notes?: string) {
  await api.post(`/habits/${habitId}/checkins`, { date, notes });
}