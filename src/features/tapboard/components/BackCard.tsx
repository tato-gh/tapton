import type { FC } from 'react';
import { Box, Heading, Text } from 'native-base';

type Props = {
  title: string,
  content: string,
  fontSize?: string,
  focus?: boolean
};

const BackCard: FC<Props> = ({ title, content, fontSize = '2xl', focus = false }) => {
  return (
    <Box
      bg={focus ? '#FEFEFE' : '#888'}
      borderRadius='5'
      rounded='md'
      borderWidth={focus ? '6' : '0'}
      borderColor={focus ? 'blue.400' : ''}
      py='4'
      px='5'
    >
      <Heading size="md" ml="-1">
        {title}
      </Heading>
      <Text
        fontSize={fontSize}
      >
        {content}
      </Text>
    </Box>
  )
};

export default BackCard;
