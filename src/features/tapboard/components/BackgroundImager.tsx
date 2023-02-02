import type { FC, PropsWithChildren } from 'react';
import { useState, useLayoutEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackgroundImage from './BackgroundImage';

const BackgroundImager: FC<PropsWithChildren> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useLayoutEffect(() => {
    getImage()
  }, [selectedImage])

  const placeholderImageSource = require("@assets/sample_background.jpg");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0]?.uri;
      if(uri) {
        setSelectedImage(uri);
        storeImage(uri);
      }
    } else {
      alert('You did not select any image.');
    }
  };

  const storeImage = (uri: any) => {
    try {
      AsyncStorage.setItem('@backgroundImage', uri);
    } catch (e) {
      // saving error
    }
  };

  const getImage = async () => {
    try {
      const uri = await AsyncStorage.getItem('@backgroundImage')
      if(uri !== null) {
        setSelectedImage(uri)
      }
    } catch(e) {
      // error reading value
    }
  };

  return (
    <BackgroundImage image={selectedImage || placeholderImageSource} pickImageAsync={pickImageAsync}>
      { children }
    </BackgroundImage>
  );
};

export default BackgroundImager;
