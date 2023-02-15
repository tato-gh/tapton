import type { FC } from 'react';
import { View } from 'react-native';
import { Box, Heading, Text } from 'native-base';

import type { Position } from '../utils/position';
import { MAX_Z_INDEX } from '../constants';
import type { QueueCard } from '../types/queueCard';

type Props = {
  queueCard: QueueCard,
  position: Position,
  focus: boolean
};

const CheckCardView: FC<Props> = ({ queueCard, position, focus }) => {
  return (
    <View
      style={{ position: 'absolute', top: position.top, left: position.left, zIndex: (focus ? MAX_Z_INDEX : MAX_Z_INDEX - queueCard.no), transform: [{rotate: `${position.rotate}deg`}]}}
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
          {queueCard.title}
        </Heading>
        <Text
          fontSize='2xl'
        >
          {queueCard.body}
        </Text>
      </Box>
    </View>
  );
};

export default CheckCardView;
