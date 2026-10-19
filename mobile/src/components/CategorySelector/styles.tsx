
import styled from 'styled-components/native';
import { categoryColors, colors } from '../../theme';
import { Category } from '../../interfaces/Habits';

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.Pressable<{
  $category: Category;
  $selected: boolean;
}>`
  height: 44px;
  padding: 0 16px;
  border-radius: 99px;
  align-items: center;
  justify-content: center;

  background-color: ${({ $selected, $category }) =>
    $selected ? categoryColors[$category].bg : colors.surface};

  border: 1.5px solid
    ${({ $selected, $category }) =>
      $selected ? categoryColors[$category].text : colors.line};
`;

export const ChipText = styled.Text<{
  $category: Category;
  $selected: boolean;
}>`
  font-size: 15px;
  font-weight: ${({ $selected }) => ($selected ? '600' : '500')};

  color: ${({ $selected, $category }) =>
    $selected ? categoryColors[$category].text : colors.ink};
`;
