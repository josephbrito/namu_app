import styled from 'styled-components/native';
import { colors } from '../../theme';

export const Container = styled.View`
  flex-direction: row;
  background-color: ${colors.surface};
  border: 1.5px solid ${colors.line};
  border-radius: 14px;
  padding: 4px;
`;

export const Option = styled.Pressable<{ $selected: boolean }>`
  flex: 1;
  height: 44px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $selected }) => ($selected ? colors.primary : 'transparent')};
`;

export const OptionText = styled.Text<{ $selected: boolean }>`
  font-size: 15px;
  font-weight: ${({ $selected }) => ($selected ? '600' : '500')};
  color: ${({ $selected }) => ($selected ? colors.white : colors.ink)};
`;