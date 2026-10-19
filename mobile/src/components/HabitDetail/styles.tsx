import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categoryColors, colors } from '../../theme';
import { Category } from '../../interfaces/Habits';

export const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

export const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 20px 12px;
`;

export const RoundButton = styled.Pressable`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.surface};
`;

export const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

export const CategoryChip = styled.View<{ $category: Category }>`
  padding: 3px 10px;
  border-radius: 99px;
  background-color: ${({ $category }) => categoryColors[$category].bg};
`;

export const CategoryText = styled.Text<{ $category: Category }>`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $category }) => categoryColors[$category].text};
`;

export const MetaText = styled.Text`
  font-size: 13px;
  color: ${colors.muted};
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.6px;
  color: ${colors.ink};
`;

export const Description = styled.Text`
  font-size: 15px;
  color: ${colors.muted};
  margin: 6px 0 16px;
`;

export const StreakCard = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 14px;
  background-color: ${colors.ink};
  border-radius: 20px;
  padding: 16px 18px;
  margin-bottom: 12px;
`;

export const StreakValue = styled.Text`
  font-size: 34px;
  font-weight: 800;
  line-height: 38px;
  color: ${colors.white};
`;

export const StreakCaption = styled.Text`
  font-size: 14px;
  color: ${colors.onInkMuted};
  margin-top: 2px;
`;

export const Footer = styled.View`
  padding: 12px 20px 16px;
`;

export const CheckinButton = styled.Pressable<{ $done: boolean }>`
  height: 56px;
  border-radius: 28px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${({ $done }) => ($done ? categoryColors.saude.bg : colors.primary)};
`;

export const CheckinText = styled.Text<{ $done: boolean }>`
  font-size: 17px;
  font-weight: 600;
  color: ${({ $done }) => ($done ? categoryColors.saude.text : colors.white)};
`;