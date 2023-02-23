import { registerRootComponent } from "expo";
import type { FC } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { enableFreeze } from "react-native-screens";

enableFreeze(true);

const App: FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return(
      <SafeAreaProvider>
        <NativeBaseProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </NativeBaseProvider>
      </SafeAreaProvider>
    )
  }
};

registerRootComponent(App);
export default App;
