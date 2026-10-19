import { useMemo } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getErrorMessage } from '../../api/client';
import { useHabits } from '../../context/HabitsContext';
import { RootStackParamList } from '../../interfaces/Routes';
import { IHabit } from '../../interfaces/Habits';
import { formatToday } from '../../utils/format';
import HabitCard from '../HabitCard';
import { PlusIcon } from '../../Icons';
import Today from '../Today';
import { AddButton, AddText, DateText, Empty, Header, Heading, RetryButton, RetryText, Screen } from './styles';

function Layout() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { habits, loading, error, refresh, checkIn } = useHabits();
  const done = useMemo(() => habits.filter((h) => h.doneToday).length, [habits]);

  async function handleCheckin(habit: IHabit) {
    if (habit.doneToday) return;
    try {
      await checkIn(habit.id);
    } catch (e) {
      Alert.alert('Não foi possível fazer o check-in', getErrorMessage(e));
    }
  }

  function handleOpenHabit(habit: IHabit) {
    navigation.navigate('HabitDetail', { habitId: habit.id });
  }

  function handleAddHabit() {
    navigation.navigate('HabitForm');
  }

  return (
    <Screen edges={['top']}>
      <FlatList
        data={habits}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <HabitCard habit={item} onPress={handleOpenHabit} onToggleCheckin={handleCheckin} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={
          <>
            <Header>
              <DateText>{formatToday()}</DateText>
              <Heading>Seus hábitos</Heading>
            </Header>
            <Today done={done} total={habits.length} />
            <View style={{ height: 16 }} />
          </>
        }
        refreshing={loading}
        onRefresh={refresh}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false} />

      <AddButton onPress={handleAddHabit} accessibilityRole="button" accessibilityLabel="Novo hábito">
        <PlusIcon />
        <AddText>Novo hábito</AddText>
      </AddButton>
    </Screen>
  );
}

export default Layout;