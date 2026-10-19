import Routes from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HabitsProvider } from './src/context/HabitsContext';

function App() {
  return (
    <SafeAreaProvider>
      <HabitsProvider>
        <Routes />
      </HabitsProvider>
    </SafeAreaProvider>
  );
}

export default App;