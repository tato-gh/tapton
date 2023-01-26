import type { FC } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const App: FC = () => {
  return(
    <SafeAreaProvider>
      <StatusBar />
    </SafeAreaProvider>
  )
};

export default App;
