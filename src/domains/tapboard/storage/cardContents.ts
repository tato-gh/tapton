import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStoreKey = (cardId: string) => {
  return `@cardContent-${cardId}`;
};

export const getCardContent = async (cardId: string) => {
  const key = getStoreKey(cardId);
  const jsonValue = await AsyncStorage.getItem(key);

  return jsonValue ? JSON.parse(jsonValue) : null;
};
