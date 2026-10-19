import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';

export const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px 20px 20px;
`;

export const BackButton = styled.Pressable`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.surface};
`;

export const Heading = styled.Text`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.ink};
`;

export const Group = styled.View`
  margin-bottom: 18px;
`;

export const GroupLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.ink};
  margin-bottom: 6px;
`;

export const ErrorText = styled.Text`
  color: ${colors.danger};
  font-size: 13px;
  font-weight: 600;
  margin-top: 8px;
`;

export const DeleteButton = styled.Pressable`
  height: 48px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

export const DeleteText = styled.Text`
  color: ${colors.danger};
  font-size: 15px;
  font-weight: 600;
`;

export const Footer = styled.View`
  padding: 12px 20px 16px;
`;

export const SaveButton = styled.Pressable<{ $disabled: boolean }>`
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

export const SaveText = styled.Text`
  color: ${colors.white};
  font-size: 17px;
  font-weight: 600;
`;