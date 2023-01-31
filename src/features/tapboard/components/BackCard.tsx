import type { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Box, Heading, Text } from 'native-base';

import CircleButton from '@molecules/CircleButton';
import type { Position } from '../utils/position';
import { OPE_BOTTOM_POSITION } from '../constants';

type Props = {
  title: string,
  content: string,
  position: Position,
  zIndex: number,
  focus?: boolean
};

const BackCard: FC<Props> = ({ title, content, position, zIndex, focus = false }) => {
  return (
    <>
      <View
        style={{ position: 'absolute', top: position.top, left: position.left, zIndex: zIndex, transform: [{rotate: `${position.rotate}deg`}]}}
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
        <View style={[styles.opeContainer, {zIndex: 999}]}>
          <View style={styles.opeRow}>
            <CircleButton theme='primary' icon='check' onPress={() => {}} />
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
