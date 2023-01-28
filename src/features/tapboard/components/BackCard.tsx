import type { FC } from 'react';
import { View } from 'react-native';
import { Box, Text } from 'native-base';

type Props = {
  top: number,
  left: number,
  fontSize?: string,
  rotate?: number
};

const BackCard: FC<Props> = ({ top, left, fontSize = '2xl', rotate = 10 }) => {
  return (
    <View style={{ position: 'absolute', top: top, left: left, transform: [{rotate: `${rotate}deg`}] }}>
      <Box
        bg='#FFF'
        borderRadius='5'
        rounded='md'
        py='4'
        px='3'
      >
        <Text
          fontSize={fontSize}
        >
          Hello world
        </Text>
      </Box>
    </View>
  )
};

export default BackCard;
