export function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function buildMonthCells(year: number, month: number): (number | null)[] {
  const offset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return [...Array.from({ length: offset }, () => null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
}