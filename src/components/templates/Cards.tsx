import type { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import TapboardCardLister from '@features/tapboard/components/CardLister';

const Cards: FC = () => {
  return (
    <View style={styles.container}>
      <TapboardCardLister />
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  }
});
