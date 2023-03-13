import type { FC, PropsWithChildren } from 'react';
import { Box, Heading, Text } from 'native-base';
import { View } from 'react-native';

import { MAX_Z_INDEX } from '../constants';
import type { QueueCard } from '../types/queueCard';
import type { Position } from '../utils/position';

type Props = PropsWithChildren & {
  queueCard: QueueCard;
  position: Position;
  focus: boolean;
  central?: boolean;
};

const CheckCardView: FC<Props> = ({
  queueCard,
  position,
  focus,
  central,
  children
}) => {
  const width = central ? '99%' : 'auto';

  return (
    <View
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width,
        zIndex: focus ? MAX_Z_INDEX : MAX_Z_INDEX - queueCard.no,
        transform: [{ rotate: `${position.rotate}deg` }],
      }}
    >
      <Box
        bg={focus ? '#FEFEFE' : '#888'}
        borderRadius="5"
        rounded="md"
        borderWidth={focus ? '4' : '0'}
        borderColor={focus ? 'blue.500' : ''}
        py="4"
        px="3"
        mx="1"
      >
        <Heading size="sm" mb="1">
          {queueCard.title}
        </Heading>
        <Text fontSize="2xl">{queueCard.body}</Text>

        {children}
      </Box>
    </View>
  );
};

export default CheckCardView;
