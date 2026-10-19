import * as habitsService from '../services/habits';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getErrorMessage } from '../api/client';
import { toHabit } from '../services/habitMapper';
import { IHabit, IHabitFormValues } from '../interfaces/Habits';
import { toDateKey } from '../utils/calendar';

interface HabitsContextValue {
  habits: IHabit[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getHabit: (id: number) => IHabit | undefined;
  saveHabit: (values: IHabitFormValues, id?: number) => Promise<void>;
  removeHabit: (id: number) => Promise<void>;
  checkIn: (habitId: number) => Promise<void>;
}

const HabitsContext = createContext<HabitsContextValue | undefined>(undefined);

export function HabitsProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<IHabit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (showLoading: boolean) => {
    if (showLoading) setLoading(true);
    try {
      const data = await habitsService.fetchHabits();
      setHabits(data.map(toHabit));
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(true);
  }, [load]);

  const value = useMemo<HabitsContextValue>(
    () => ({
      habits,
      loading,
      error,
      refresh: () => load(true),
      getHabit: (id) => habits.find((h) => h.id === id),
      saveHabit: async (values, id) => {
        if (id) await habitsService.updateHabit(id, values);
        else await habitsService.createHabit(values);
        await load(false);
      },
      removeHabit: async (id) => {
        await habitsService.deleteHabit(id);
        await load(false);
      },
      checkIn: async (habitId) => {
        await habitsService.createCheckin(habitId, toDateKey(new Date()));
        await load(false);
      },
    }),
    [habits, loading, error, load],
  );

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
  const context = useContext(HabitsContext);
  if (!context) throw new Error('useHabits deve ser usado dentro de <HabitsProvider>');
  return context;
}