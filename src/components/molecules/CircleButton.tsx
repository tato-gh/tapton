import type { FC } from 'react';
import { Box, Pressable } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  theme: string,
  icon: any,
  onPress: any,
  size?: number
}

const themeCircleColor: {[parameter: string]: string} = {
  'primary': 'primary.500'
};

const themeButtonColor: {[parameter: string]: string} = {
  'primary': 'white'
};

const CircleButton: FC<Props> = ({ theme, icon, onPress, size = 38 }) => {
  return (
    <Box
      width='84'
      height='84'
      borderColor={themeCircleColor[theme]}
      borderWidth='3'
      borderRadius='42'
      p='1'
    >
      <Pressable
        flex='1'
        justifyContent='center'
        alignItems='center'
        borderRadius='42'
        backgroundColor={themeButtonColor[theme]}
        onPress={onPress}
      >
        <MaterialIcons name={icon} size={size} color='#25292e' />
      </Pressable>
    </Box>
  );
};

export default CircleButton;

