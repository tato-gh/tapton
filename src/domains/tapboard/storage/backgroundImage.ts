import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeImage = (uri: any) => {
  AsyncStorage.setItem('@backgroundImage', uri);
};

export const getImage = async () => {
  const uri = await AsyncStorage.getItem('@backgroundImage');
  return uri;
};
