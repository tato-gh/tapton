import type { FC, PropsWithChildren } from 'react';
import { useState, useLayoutEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import BackgroundImage from './BackgroundImage';
import { storeImage, getImage } from '@domains/tapboard/storage/backgroundImage';
import type { ImageSource } from '../types/imageSource';

const BackgroundImager: FC<PropsWithChildren> = ({ children }) => {
  const placeholderImageSource = require("@assets/sample_background.jpg");
  const [selectedImage, setSelectedImage] = useState<ImageSource>(placeholderImageSource);

  useLayoutEffect(() => {
    (async () => {
      const base64 = await getImage();
      if(base64) {
        setSelectedImage({uri: `data:image;base64,${base64}`});
      }
    })();
  }, [selectedImage])

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      const base64 = result.assets[0]?.base64;
      if(base64) {
        setSelectedImage({uri: `data:image;base64,${base64}`});
        storeImage(base64);
      }
    } else {
      alert('画像が選択されませんでした');
    }
  };

  return (
    <BackgroundImage image={selectedImage} pickImageAsync={pickImageAsync}>
      { children }
    </BackgroundImage>
  );
};

export default BackgroundImager;
