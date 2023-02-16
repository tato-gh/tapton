import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';
import HomeScreen from "@screens/HomeScreen";
import CardsScreen from "@screens/CardsScreen";
import NewCardScreen from "@screens/NewCardScreen";
import EditCardScreen from "@screens/EditCardScreen";


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cards" component={CardsScreen} options={{ headerTitle: '管理ページ' }} />
      <Stack.Screen name="NewCard" component={NewCardScreen} options={{ headerTitle: '新規カード作成' }} />
      <Stack.Screen name="EditCard" component={EditCardScreen} options={{ headerTitle: 'カード編集' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
