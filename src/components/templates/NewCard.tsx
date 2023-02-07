import type { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import TapboardNewCardFormer from '@features/tapboard/components/NewCardFormer';

const NewCard: FC = () => {
  return (
    <View style={styles.container}>
      <TapboardNewCardFormer />
    </View>
  );
};

export default NewCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  }
});
