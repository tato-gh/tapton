import type { FC } from 'react';
import colors, { type ThemeName } from '@constants/colors';
import { Box, Pressable, Icon } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type Props = {
  theme: ThemeName;
  icon: any;
  onPress: any;
  size?: string;
};

const sizes: Record<string, Record<string, string>> = {
  lg: {
    width: '84',
    height: '84',
    borderWidth: '2',
    borderRadius: '42',
    icon: '38',
  },
  md: {
    width: '62',
    height: '62',
    borderWidth: '2',
    borderRadius: '28',
    icon: '26',
  },
};

const CircleButton: FC<Props> = ({ theme, icon, onPress, size = 'lg' }) => {
  return (
    <Box
      width={sizes[size].width}
      height={sizes[size].height}
      borderColor={colors[theme].circle}
      borderWidth={theme != 'muted' ? sizes[size].borderWidth : '0'}
      borderRadius={sizes[size].borderRadius}
      p="1"
    >
      <Pressable
        flex="1"
        justifyContent="center"
        alignItems="center"
        borderRadius={sizes[size].borderRadius}
        backgroundColor={colors[theme].circleBackground}
        onPress={onPress}
      >
        <Icon
          as={MaterialIcons}
          name={icon}
          size={sizes[size].icon}
          color={colors[theme].icon}
        />
      </Pressable>
    </Box>
  );
};

export default CircleButton;
