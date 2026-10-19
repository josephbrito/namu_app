import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';

export const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  padding-top: 16px;
  gap: 2px;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: ${colors.muted};
`;

export const Heading = styled.Text`
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.6px;
  color: ${colors.ink};
  margin-bottom: 14px;
`;

export const Empty = styled.Text`
  text-align: center;
  color: ${colors.muted};
  margin-top: 32px;
`;

export const AddButton = styled.Pressable`
  position: absolute;
  right: 20px;
  bottom: 28px;
  height: 56px;
  padding: 0 22px 0 16px;
  border-radius: 28px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: ${colors.primary};
`;

export const AddText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: 600;
`;

export const RetryButton = styled.Pressable`
  align-self: center;
  margin-top: 12px;
  height: 44px;
  padding: 0 20px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${colors.primary};
`;

export const RetryText = styled.Text`
  color: ${colors.primary};
  font-size: 15px;
  font-weight: 600;
`;