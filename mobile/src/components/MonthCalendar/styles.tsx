import styled from 'styled-components/native';
import { colors } from '../../theme';

export type DayStatus = 'done' | 'today' | 'past' | 'future';

export const Container = styled.View`
  background-color: ${colors.surface};
  border: 1px solid ${colors.line};
  border-radius: 20px;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${colors.ink};
  margin-bottom: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const WeekdayText = styled.Text`
  width: 14.2857%;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.muted};
  margin-bottom: 4px;
`;

export const Cell = styled.View`
  width: 14.2857%;
  height: 44px;
  align-items: center;
  justify-content: center;
`;

export const Day = styled.View<{ $status: DayStatus }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $status }) =>
    $status === 'done' ? colors.primary : $status === 'past' ? colors.surface : 'transparent'};
  border: 2px solid ${({ $status }) =>
    $status === 'today' ? colors.primary : $status === 'past' ? colors.background : 'transparent'};
`;

export const DayText = styled.Text<{ $status: DayStatus }>`
  font-size: 14px;
  font-weight: ${({ $status }) => ($status === 'done' || $status === 'today' ? '700' : '400')};
  color: ${({ $status }) =>
    $status === 'done'
      ? colors.white
      : $status === 'today'
        ? colors.ink
        : $status === 'past'
          ? colors.muted
          : colors.faint};
`;