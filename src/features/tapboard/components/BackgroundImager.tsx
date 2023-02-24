import type { FC, PropsWithChildren } from 'react';
import { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import BackgroundImage from './BackgroundImage';
import { storeImage, getImage } from '@domains/tapboard/storage/backgroundImage';
import { getLibraryImage } from '@domains/device/images/mediaLibrary';
import type { ImageSource } from '../types/imageSource';

const BackgroundImager: FC<PropsWithChildren> = ({ children }) => {
  const placeholderImageSource = require("@assets/sample_background.jpg");
  const [selectedImage, setSelectedImage] = useState<ImageSource | null>(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    (async () => {
      const base64 = await getImage();
      if(base64) {
        setSelectedImage({uri: `data:image;base64,${base64}`});
      }
    })();
  }, [])

  const pickImageAsync = async () => {
    const base64 = await getLibraryImage();

    if (base64) {
      await storeImage(base64);
      // 下記、エミュレータ上ですぐに反映されない
      // `getLibraryImage()`を使うようになってから発生した現象
      // setSelectedImage({uri: `data:image;base64,${base64}`});
      // そのため、画面ごとリフレッシュしている
      navigation.replace('Home');
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
