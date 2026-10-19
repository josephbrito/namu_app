import styled from 'styled-components/native';
import { categoryColors, colors } from '../../theme';

type HabitCategory = keyof typeof categoryColors;

export const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 14px;
  background-color: ${colors.surface};
  border: 1px solid ${colors.line};
  border-radius: 18px;
  padding: 14px;
`;

export const CheckButton = styled.Pressable<{ $done: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $done }) => ($done ? colors.primary : colors.surface)};
  border: 2px solid ${({ $done }) => ($done ? colors.primary : colors.line)};
`;

export const Info = styled.View`
  flex: 1;
`;

export const Title = styled.Text<{ $done: boolean }>`
  font-size: 17px;
  font-weight: 600;
  color: ${({ $done }) => ($done ? colors.muted : colors.ink)};
`;

export const CaptionRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
`;

export const CategoryChip = styled.View<{ $category: HabitCategory }>`
  padding: 3px 10px;
  border-radius: 99px;
  background-color: ${({ $category }) => categoryColors[$category].bg};
`;

export const CategoryText = styled.Text<{ $category: HabitCategory }>`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $category }) => categoryColors[$category].text};
`;

export const CaptionText = styled.Text`
  font-size: 13px;
  color: ${colors.muted};
`;

export const Streak = styled.View`
  width: 64px;
  align-items: center;
  gap: 2px;
`;

export const StreakText = styled.Text`
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: ${colors.muted};
`;