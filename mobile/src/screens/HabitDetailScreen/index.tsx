import HabitDetail from '../../components/HabitDetail';
import { useState } from 'react';
import { Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getErrorMessage } from '../../api/client';
import { useHabits } from '../../context/HabitsContext';
import { RootStackParamList } from '../../interfaces/Routes';

type Props = NativeStackScreenProps<RootStackParamList, 'HabitDetail'>;

function HabitDetailScreen({ navigation, route }: Props) {
  const { habitId } = route.params;
  const { getHabit, checkIn } = useHabits();
  const habit = getHabit(habitId);
  const [submitting, setSubmitting] = useState(false);

  if (!habit) return null;

  async function handleCheckin() {
    setSubmitting(true);
    try {
      await checkIn(habitId);
    } catch (e) {
      Alert.alert('Não foi possível fazer o check-in', getErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <HabitDetail habit={habit} streak={habit.streak} checkins={habit.checkins} submitting={submitting} onBack={navigation.goBack}
    onEdit={() => navigation.navigate('HabitForm', { habit })} onCheckin={handleCheckin} />
  );
}

export default HabitDetailScreen;