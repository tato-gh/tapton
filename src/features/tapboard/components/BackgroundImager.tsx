import type { FC, PropsWithChildren } from 'react';
import { useState, useLayoutEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import BackgroundImage from './BackgroundImage';
import { storeImage, getImage } from '@domains/tapboard/storage/backgroundImage';

const BackgroundImager: FC<PropsWithChildren> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useLayoutEffect(() => {
    (async () => {
      const uri = await getImage();
      if(uri) {
        setSelectedImage(uri);
      }
    })();
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
      alert('画像が選択されませんでした');
    }
  };

  return (
    <BackgroundImage image={selectedImage || placeholderImageSource} pickImageAsync={pickImageAsync}>
      { children }
    </BackgroundImage>
  );
};

export default BackgroundImager;
