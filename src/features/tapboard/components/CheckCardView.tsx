import type { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Box, Heading } from 'native-base';
import Markdown from 'react-native-markdown-renderer';

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
        <Markdown style={styles.markdown}>
          {queueCard.body}
        </Markdown>
      </Box>
    </View>
  );
};

export default CheckCardView;

const styles = StyleSheet.create({
  markdown: {
    text: {
      fontSize: 18,
    },
    code: {
      fontSize: 14,
    },
    heading1: {
      fontSize: 32,
    },
    heading2: {
      fontSize: 24,
    },
    heading3: {
      fontSize: 18,
    },
    heading4: {
      fontSize: 16,
    },
    heading5: {
      fontSize: 16,
    },
    heading6: {
      fontSize: 16,
    }
  }
});
