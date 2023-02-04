import type { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import IconButton from '@molecules/IconButton';

const Cards: FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.btnMenuHome}>
        <IconButton theme='muted' icon='arrow-back' label='' onPress={() => { navigation.navigate('Home', {}) }} />
      </View>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  btnMenuHome: {
    position: 'absolute',
    bottom: 10,
    left: 10
  }
});
