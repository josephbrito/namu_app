import HabitForm from '../../components/HabitForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { RootStackParamList } from '../../interfaces/Routes';
import { IHabitFormValues } from '../../interfaces/Habits';
import { useHabits } from '../../context/HabitsContext';
import { Alert } from 'react-native';
import { getErrorMessage } from '../../api/client';

type Props = NativeStackScreenProps<RootStackParamList, 'HabitForm'>;

function HabitFormScreen({ navigation, route }: Props) {
  const habitData = route.params?.habit;
  const { saveHabit, removeHabit } = useHabits();
  const [submitting, setSubmitting] = useState(false);
  

  async function handleSubmit(values: IHabitFormValues) {
    setSubmitting(true);
    try {
      await saveHabit(values, habitData?.id);
      navigation.goBack();
    } catch (e) {
      setSubmitting(false);
      Alert.alert('Não foi possível salvar', getErrorMessage(e));
    }
  }

  async function handleDelete() {
    if (!habitData?.id) return;
    try {
      await removeHabit(habitData?.id);
      navigation.popToTop();
    } catch (e) {
      Alert.alert('Não foi possível excluir', getErrorMessage(e));
    }
  }

  return <HabitForm habit={habitData} onBack={navigation.goBack} onSubmit={handleSubmit} onDelete={habitData ? handleDelete : undefined} />
}

export default HabitFormScreen;