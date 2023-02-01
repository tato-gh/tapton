import type { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { OPE_BOTTOM_POSITION, MAX_Z_INDEX } from '../constants';
import CircleButton from '@molecules/CircleButton';

type Props = {
  onPress: Function
};

const CheckCardForm: FC<Props> = ({ onPress }) => {

  return (
    <View style={[styles.opeContainer, {zIndex: MAX_Z_INDEX}]}>
      <View style={styles.opeRow}>
        <CircleButton theme='primary' icon='check' onPress={onPress} />
      </View>
    </View>
  )
};

export default CheckCardForm;

const styles = StyleSheet.create({
  opeContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: OPE_BOTTOM_POSITION,
  },
  opeRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
