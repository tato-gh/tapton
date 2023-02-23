import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "@screens/HomeScreen";
import CardsScreen from "@screens/CardsScreen";
import NewCardScreen from "@screens/NewCardScreen";
import EditCardScreen from "@screens/EditCardScreen";

import HeaderLeft from '@organisms/HeaderLeft';
import { UUID } from 'uuidjs';

export default function Navigation() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const headerLeft = () => { return HeaderLeft({}) };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          headerTitle: '管理ページ',
          headerLeft: () => { return HeaderLeft({backTo: 'Home', options: { refreshKey: UUID.generate()}}); }
        }}
      />
      <Stack.Screen name="NewCard" component={NewCardScreen} options={{ headerTitle: '新規カード作成', headerLeft: headerLeft }} />
      <Stack.Screen name="EditCard" component={EditCardScreen} options={{ headerTitle: 'カード編集', headerLeft: headerLeft }} />
    </Stack.Navigator>
  );
}
