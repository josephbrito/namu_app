import { Container, Fill, Label, Row, Track } from './styles';

interface TodayProps {
  done: number;
  total: number;
}

function Today({ done, total }: TodayProps) {
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <Container>
      <Row>
        <Label>Hoje</Label>
        <Label>
          {done} de {total} cumpridos
        </Label>
      </Row>
      <Track accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: total, now: done }}>
        <Fill $percent={percent} />
      </Track>
    </Container>
  );
}

export default Today;