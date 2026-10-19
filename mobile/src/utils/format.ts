const WEEKDAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MONTHS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];
 
export function formatToday(date = new Date()) {
  const day = date.getDay();
  const suffix = day === 0 || day === 6 ? '' : '-feira';
  return `${WEEKDAYS[day]}${suffix}, ${date.getDate()} de ${MONTHS[date.getMonth()]}`;
}
 
export function formatStreak(streak: number, frequency: 'diário' | 'semanal') {
  if (streak === 0) return 'Comece hoje';
  const [one, many] = frequency === 'semanal' ? ['semana', 'semanas'] : ['dia', 'dias'];
  return streak === 1 ? `1 ${one} seguido` : `${streak} ${many} seguidos`;
}
 
export function formatMonthYear(date = new Date()) {
  const month = MONTHS[date.getMonth()];
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} de ${date.getFullYear()}`;
}