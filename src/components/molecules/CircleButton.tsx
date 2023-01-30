import type { FC } from 'react';
import { Box, Pressable, Icon } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import colors, { ThemeName } from '@constants/colors';

type Props = {
  theme: ThemeName,
  icon: any,
  onPress: any,
  size?: number
}

const CircleButton: FC<Props> = ({ theme, icon, onPress, size = 38 }) => {
  return (
    <Box
      width='84'
      height='84'
      borderColor={colors[theme]['circle']}
      borderWidth='2'
      borderRadius='42'
      p='1'
    >
      <Pressable
        flex='1'
        justifyContent='center'
        alignItems='center'
        borderRadius='42'
        backgroundColor={colors[theme]['circleBackground']}
        onPress={onPress}
      >
        <Icon as={MaterialIcons} name={icon} size={size} color={colors[theme]['icon']} />
      </Pressable>
    </Box>
  );
};

export default CircleButton;

