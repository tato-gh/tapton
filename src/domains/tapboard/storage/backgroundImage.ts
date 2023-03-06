import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeImage = async (base64: string) => {
  await AsyncStorage.setItem('@backgroundImage', base64);
};

export const getImage = async () => {
  const uri = await AsyncStorage.getItem('@backgroundImage');

  return uri;
};
