import type { FC } from 'react';
import { Icon } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import colors, { ThemeName } from '@constants/colors';

type Props = {
  theme: ThemeName,
  icon: any,
  size?: number
};

const IconBadge: FC<Props> = ({ theme, icon, size = 10 }) => {
  return (
    <Icon
      as={MaterialIcons}
      name={icon}
      size={size}
      color={colors[theme]['icon']}
      padding='0'
    />
  );
};

export default IconBadge;
