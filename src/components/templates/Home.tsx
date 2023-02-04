import type { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TapboardBackgroundImager from '@features/tapboard/components/BackgroundImager';
import TapboardCheckListQueue from '@features/tapboard/components/CheckListQueue';
import IconButton from '@molecules/IconButton';

const Home: FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TapboardBackgroundImager>
        <TapboardCheckListQueue />
        <View style={styles.btnMenuCards}>
          <IconButton theme='muted' icon='notes' label='' onPress={() => { navigation.navigate('Cards', {}) }} />
        </View>
      </TapboardBackgroundImager>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  btnMenuCards: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});
