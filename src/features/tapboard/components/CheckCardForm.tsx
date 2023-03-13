import type { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import CircleButton from '@molecules/CircleButton';
import { OPE_BOTTOM_POSITION, MAX_Z_INDEX } from '../constants';

type Props = {
  onPress: Function;
  onPressSkip: Function;
  onAction: Function;
};

const CheckCardForm: FC<Props> = ({ onPress, onPressSkip, onAction }) => {
  console.log(onAction);
  return (
    <View style={[styles.opeContainer, { zIndex: MAX_Z_INDEX }]}>
      <View style={styles.main}>
        <CircleButton theme="primary" icon="check" onPress={onPress} />
      </View>
      <View style={styles.subs}>
        <View style={styles.subLeft}>
          <CircleButton
            theme="muted"
            icon="low-priority"
            onPress={onPressSkip}
            size="md"
          />
        </View>
        {onAction && (
          <View style={styles.subRight}>
            <CircleButton
              theme="muted"
              icon="play-for-work"
              onPress={onAction}
              size="md"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CheckCardForm;

const styles = StyleSheet.create({
  opeContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: OPE_BOTTOM_POSITION,
  },
  main: {
    position: 'relative',
  },
  subs: {
    marginTop: -50,
    width: '55%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subLeft: {
  },
  subRight: {
  },
});
