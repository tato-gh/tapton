import type { FC, PropsWithChildren } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

import IconButton from '@molecules/IconButton';

type Props = PropsWithChildren & {
  image: any,
  pickImageAsync: Function
};

const BackgroundImage: FC<Props> = ({ image, pickImageAsync, children }) => {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      { children }
      <View style={styles.btnPickImage}>
        <IconButton theme='muted' icon='image' label='' onPress={pickImageAsync} />
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
    left: 10
  },
});

export default BackgroundImage;
