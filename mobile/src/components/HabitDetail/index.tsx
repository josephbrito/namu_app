import MonthCalendar from '../MonthCalendar';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { categoryColors, colors } from '../../theme';
import { Category, IHabit } from '../../interfaces/Habits';
import { toDateKey } from '../../utils/calendar';
import { BackIcon, CheckIcon, EditIcon, FlameIcon } from '../../Icons';
import { CategoryChip, CategoryText, CheckinButton, CheckinText, Description, Footer, MetaRow,
  MetaText, RoundButton, Screen, StreakCaption, StreakCard, StreakValue, Title, TopBar } from './styles';

interface HabitDetailProps {
  habit: IHabit;
  streak: number;
  checkins: string[];
  submitting?: boolean;
  onBack: () => void;
  onEdit: () => void;
  onCheckin: () => void;
}

function HabitDetail({ habit, streak, checkins, submitting = false, onBack, onEdit, onCheckin }: HabitDetailProps) {
  const { title, description, category, frequency } = habit;
  const doneToday = checkins.includes(toDateKey(new Date()));
  const unit = frequency === 'semanal' ? ['semana', 'semanas'] : ['dia', 'dias'];

  return (
    <Screen edges={['top', 'bottom']}>
      <TopBar>
        <RoundButton onPress={onBack} accessibilityRole="button" accessibilityLabel="Voltar">
          <BackIcon />
        </RoundButton>
        <RoundButton onPress={onEdit} accessibilityRole="button" accessibilityLabel="Editar hábito">
          <EditIcon />
        </RoundButton>
      </TopBar>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <MetaRow>
          <CategoryChip $category={category as Category}>
            <CategoryText $category={category as Category}>{categoryColors['saude'].label}</CategoryText>
          </CategoryChip>
          <MetaText>{frequency === 'diario' ? 'Diário' : 'Semanal'}</MetaText>
        </MetaRow>

        <Title>{title}</Title>
        {!!description && <Description>{description}</Description>}

        <StreakCard accessible accessibilityLabel={`Sequência atual: ${streak} ${streak === 1 ? unit[0] : unit[1]}`}>
          <FlameIcon size={30} color={colors.streakLight} />
          <View>
            <StreakValue>
              {streak} {streak === 1 ? unit[0] : unit[1]}
            </StreakValue>
            <StreakCaption>de sequência atual</StreakCaption>
          </View>
        </StreakCard>

        <MonthCalendar checkins={checkins} />
      </ScrollView>

      <Footer>
        <CheckinButton $done={doneToday} onPress={onCheckin} disabled={doneToday || submitting} accessibilityRole="button" accessibilityState={{ disabled: doneToday || submitting }}>
          {submitting ? (<ActivityIndicator color={colors.white} />) : (
            <>
              <CheckIcon color={doneToday ? categoryColors.saude.text : colors.white} />
              <CheckinText $done={doneToday}>
                {doneToday ? 'Check-in feito hoje' : 'Fazer check-in de hoje'}
              </CheckinText>
            </>
          )}
        </CheckinButton>
      </Footer>
    </Screen>
  );
}

export default HabitDetail;