import type { FC, PropsWithChildren } from 'react';
import { FLOAT_OP_Z_INDEX } from '@constants/layout';
import { View, ImageBackground, StyleSheet } from 'react-native';

import IconButton from '@molecules/IconButton';
import type { ImageSource } from '../types/imageSource';

type Props = PropsWithChildren & {
  image: ImageSource;
  pickImageAsync: Function;
};

const BackgroundImage: FC<Props> = ({ image, pickImageAsync, children }) => {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      {children}
      <View style={styles.btnPickImage}>
        <IconButton
          theme="muted"
          icon="image"
          label=""
          onPress={pickImageAsync}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  btnPickImage: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: FLOAT_OP_Z_INDEX,
  },
});

export default BackgroundImage;
