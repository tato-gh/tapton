import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import BackgroundImage from './BackgroundImage';

const BackgroundImager: FC<PropsWithChildren> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const placeholderImageSource = require("@assets/sample_background.jpg");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]?.uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <BackgroundImage image={selectedImage || placeholderImageSource} pickImageAsync={pickImageAsync}>
      { children }
    </BackgroundImage>
  );
};

export default BackgroundImager;
