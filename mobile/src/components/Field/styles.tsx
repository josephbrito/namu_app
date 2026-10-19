import styled from 'styled-components/native';
import { colors } from '../../theme';

export const Container = styled.View`
  margin-bottom: 18px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.ink};
  margin-bottom: 6px;
`;

export const Input = styled.TextInput<{ $error: boolean; $multiline: boolean }>`
  background-color: ${colors.surface};
  border: 1.5px solid ${({ $error }) => ($error ? colors.danger : colors.line)};
  border-radius: 14px;
  padding: 0 14px;
  font-size: 16px;
  color: ${colors.ink};
  min-height: ${({ $multiline }) => ($multiline ? '96px' : '52px')};
  ${({ $multiline }) => $multiline && 'padding-top: 12px; padding-bottom: 12px; text-align-vertical: top;'}
`;

export const ErrorText = styled.Text`
  color: ${colors.danger};
  font-size: 13px;
  font-weight: 600;
  margin-top: 6px;
`;