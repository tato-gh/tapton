import type { FC } from 'react';
import { View } from 'react-native';
import { Stack, Box, Heading, Text } from 'native-base';

type Props = {
  lead: string,
  body: string,
  top: number,
  left: number,
  rotate: string,
  zIndex: number,
  fontSize?: string,
  focus?: boolean
};

const BackCard: FC<Props> = ({ lead, body, top, left, rotate, zIndex, fontSize = '2xl', focus = false }) => {
  return (
    <View style={{ position: 'absolute', top: top, left: left, transform: [{rotate: rotate}], zIndex: zIndex }}>
      <Box
        bg='#FFF'
        borderRadius='5'
        rounded='md'
        borderWidth={focus ? '6' : '0'}
        borderColor={focus ? 'blue.400' : ''}
        py='4'
        px='5'
      >
        <Heading size="md" ml="-1">
          {lead}
        </Heading>
        <Text
          fontSize={fontSize}
        >
          {body}
        </Text>
      </Box>
    </View>
  )
};

export default BackCard;
