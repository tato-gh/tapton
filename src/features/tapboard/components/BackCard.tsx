import type { FC } from 'react';
import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Box, Heading, Text } from 'native-base';
import { Dimensions } from 'react-native';

import CircleButton from '@molecules/CircleButton';
import { getPosition } from '../utils/position';
import { OPE_BOTTOM_POSITION, CARD_WIDTH } from '../constants';

type Props = {
  title: string,
  content: string,
  zIndex: number,
  focus: boolean,
  onPress: Function
};

// maxTop: フットのメニューと被らないこと。カード回転（ただし直角にはならない）も考慮してcardWidthを引いている
const maxHeight = Dimensions.get('window').height - OPE_BOTTOM_POSITION - 0.9 * CARD_WIDTH;
const maxWidth = Dimensions.get('window').width - CARD_WIDTH;

const BackCard: FC<Props> = ({ title, content, zIndex, focus, onPress }) => {
  const position = useMemo(() => getPosition(maxHeight, maxWidth), []);
  const zIndexMemo = useMemo(() => zIndex, []);

  return (
    <>
      <View
        style={{ position: 'absolute', top: position.top, left: position.left, zIndex: (focus ? 1000 : zIndexMemo), transform: [{rotate: `${position.rotate}deg`}]}}
      >
        <Box
          bg={focus ? '#FEFEFE' : '#888'}
          borderRadius='5'
          rounded='md'
          borderWidth={focus ? '4' : '0'}
          borderColor={focus ? 'blue.500' : ''}
          py='4'
          px='5'
        >
          <Heading size="sm" ml="-1">
            {title}
          </Heading>
          <Text
            fontSize='2xl'
          >
            {content}
          </Text>
        </Box>
      </View>

      {focus && (
        <View style={[styles.opeContainer, {zIndex: 1000}]}>
          <View style={styles.opeRow}>
            <CircleButton theme='primary' icon='check' onPress={onPress} />
          </View>
        </View>
      )}
    </>
  )
};

export default BackCard;

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
