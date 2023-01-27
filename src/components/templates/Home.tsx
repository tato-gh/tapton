import type { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TapboardBackgroundImage from '@features/tapboard/components/organisms/BackgroundImage';

const Home: FC = () => {
  return (
    <TapboardBackgroundImage>
      <Text style={styles.text}>Inside</Text>
    </TapboardBackgroundImage>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  }
});

export default Home;
