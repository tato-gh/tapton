import type { FC } from 'react';
import { Pressable, Icon } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import colors, { ThemeName } from '@constants/colors';

type Props = {
  theme: ThemeName,
  icon: any,
  onPress: any,
  size?: number
};

const IconFlat: FC<Props> = ({ theme, icon, onPress, size = 10 }) => {
  return (
    <Pressable
      justifyContent='center'
      alignItems='center'
      onPress={onPress}
    >
      <Icon
        as={MaterialIcons}
        name={icon}
        size={size}
        color={colors[theme]['icon']}
        padding='0'
      />
    </Pressable>
  );
};

export default IconFlat;
