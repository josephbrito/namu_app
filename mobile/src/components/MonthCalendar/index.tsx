import { buildMonthCells, toDateKey } from '../../utils/calendar';
import { formatMonthYear } from '../../utils/format';
import { Cell, Container, Day, DayStatus, DayText, Row, Title, WeekdayText } from './styles';

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

interface MonthCalendarProps {
  /** Datas de check-in no formato YYYY-MM-DD */
  checkins: string[];
  today?: Date;
}

function MonthCalendar({ checkins, today = new Date() }: MonthCalendarProps) {
  const year = today.getFullYear();
  const month = today.getMonth();
  const done = new Set(checkins);
  const todayDay = today.getDate();

  function statusOf(day: number): DayStatus {
    if (done.has(toDateKey(new Date(year, month, day)))) return 'done';
    if (day === todayDay) return 'today';
    return day < todayDay ? 'past' : 'future';
  }

  return (
    <Container>
      <Title>{formatMonthYear(today)}</Title>
      <Row>
        {WEEKDAYS.map((label, i) => (
          <WeekdayText key={i}>{label}</WeekdayText>
        ))}
      </Row>
      <Row>
        {buildMonthCells(year, month).map((day, i) => {
          if (day === null) return <Cell key={`empty-${i}`} />;
          const status = statusOf(day);
          return (
            <Cell key={day}>
              <Day
                $status={status}
                accessible
                accessibilityLabel={`Dia ${day}${status === 'done' ? ', check-in feito' : ''}`}
              >
                <DayText $status={status}>{day}</DayText>
              </Day>
            </Cell>
          );
        })}
      </Row>
    </Container>
  );
}

export default MonthCalendar;