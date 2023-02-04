import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeImage = (uri: any) => {
  try {
    AsyncStorage.setItem('@backgroundImage', uri);
  } catch (e) {
    // saving error
  }
};

export const getImage = async () => {
  try {
    const uri = await AsyncStorage.getItem('@backgroundImage');
    return uri;
  } catch(e) {
    // error reading value
    return null;
  }
};
