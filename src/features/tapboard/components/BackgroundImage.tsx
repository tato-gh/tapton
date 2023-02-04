import type { FC, PropsWithChildren } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

import IconButton from '@molecules/IconButton';

type Props = PropsWithChildren & {
  image: any,
  pickImageAsync: Function
};

const BackgroundImage: FC<Props> = ({ image, pickImageAsync, children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        { children }
        <View style={styles.pickImage}>
          <IconButton theme='muted' icon='image' label='' onPress={pickImageAsync} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  pickImage: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
});

export default BackgroundImage;
