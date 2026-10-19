import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HabitDetailScreen from '../screens/HabitDetailScreen';
import HabitFormScreen from '../screens/HabitFormScreen';
import Layout from '../components/Layout';
import { RootStackParamList } from '../interfaces/Routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HabitList" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HabitList" component={Layout} />
        <Stack.Screen name="HabitDetail" component={HabitDetailScreen} />
        <Stack.Screen name="HabitForm" component={HabitFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;