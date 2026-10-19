import { HabitFrequency } from '../interfaces/Habits';
import { toDateKey } from './calendar';

function parseKey(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function addDays(date: Date, amount: number) {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + amount);
  return next;
}

function weekStart(date: Date) {
  return addDays(date, -((date.getDay() + 6) % 7));
}

export function calculateStreak(dates: string[], frequency: HabitFrequency, today = new Date()): number {
  const days = new Set(dates);
  let count = 0;

  if (frequency === 'diario') {
    let cursor = addDays(today, 0);
    if (!days.has(toDateKey(cursor))) cursor = addDays(cursor, -1);
    while (days.has(toDateKey(cursor))) {
      count++;
      cursor = addDays(cursor, -1);
    }
    return count;
  }

  const weeks = new Set(dates.map((key) => toDateKey(weekStart(parseKey(key)))));
  let cursor = weekStart(today);
  if (!weeks.has(toDateKey(cursor))) cursor = addDays(cursor, -7);
  while (weeks.has(toDateKey(cursor))) {
    count++;
    cursor = addDays(cursor, -7);
  }
  return count;
}