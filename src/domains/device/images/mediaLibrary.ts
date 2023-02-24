import * as ImagePicker from 'expo-image-picker';

export const getLibraryImage = async () => {
  const status = await requestPermissionsAsync();
  if(status != 'granted') { return null; }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 0.4,
    base64: true
  });

  if (!result.canceled) {
    return result.assets[0]?.base64;
  } else {
    return null;
  }
};

const requestPermissionsAsync = async () => {
  const { status: existingStatus } = await ImagePicker.getMediaLibraryPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus;
};
