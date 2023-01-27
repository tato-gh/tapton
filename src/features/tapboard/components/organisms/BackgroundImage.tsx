import type { FC, PropsWithChildren } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const BackgroundImage: FC<PropsWithChildren> = ({ children }) => {
  const image = require("@assets/sample_background.jpg");

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        { children }
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
});

export default BackgroundImage;
