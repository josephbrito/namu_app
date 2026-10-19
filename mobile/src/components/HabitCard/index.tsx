import { categoryColors, colors } from '../../theme';
import { IHabit, IHabitCardProps } from '../../interfaces/Habits';
import { formatStreak } from '../../utils/format';
import { CheckIcon, FlameIcon } from '../../Icons';
import { CaptionRow, CaptionText, CategoryChip, CategoryText, CheckButton, Container, Info, Streak, StreakText, Title } from './styles';

function HabitCard({ habit, onPress, onToggleCheckin }: IHabitCardProps)              
{                    
  const { title, category, frequency, streak, doneToday } = habit;
  const categorySelected:"saude" | "exercicio" | "alimentacao"| "mental" = category.normalize('NFD').replace(/[\u0300-\u036f]/g, "") as "saude" | "exercicio" | "alimentacao" | "mental";
  const frequencySelected: 'diário' | 'semanal' = frequency.normalize('NFD').replace(/[\u0300-\u036f]/g, "") as "diário" | "semanal"
  return (
    <Container onPress={() => onPress(habit)} accessibilityRole="button" accessibilityLabel={`Abrir ${title}`}>
      <CheckButton
        $done={doneToday}
        onPress={() => onToggleCheckin(habit)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: doneToday }}
        accessibilityLabel={`Check-in de hoje: ${title}`}
      >
        {doneToday && <CheckIcon />}
      </CheckButton>

      <Info>
        <Title $done={doneToday}>{title}</Title>
        <CaptionRow>
          <CategoryChip $category={categorySelected}>
            <CategoryText $category={categorySelected}>{categoryColors[categorySelected].label}</CategoryText>
          </CategoryChip>
          <CaptionText>{frequency.normalize('NFD').replace(/[\u0300-\u036f]/g, "") === 'diario' ? 'Diário' : 'Semanal'}</CaptionText>
        </CaptionRow>
      </Info>

      <Streak>
        <FlameIcon color={streak > 0 ? colors.streak : colors.muted} />
        <StreakText>{formatStreak(streak, frequencySelected)}</StreakText>
      </Streak>
    </Container>
  );
}

export default HabitCard;