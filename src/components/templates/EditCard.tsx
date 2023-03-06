import type { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import TapboardEditCardFormer from '@features/tapboard/components/EditCardFormer';

type Props = {
  cardId: string;
};

const EditCard: FC<Props> = ({ cardId }) => {
  return (
    <View style={styles.container}>
      <TapboardEditCardFormer cardId={cardId} />
    </View>
  );
};

export default EditCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
