import type { FC } from 'react';
import colors, { type ThemeName } from '@constants/colors';
import { Icon } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type Props = {
  theme: ThemeName;
  icon: any;
  size?: number;
};

const IconBadge: FC<Props> = ({ theme, icon, size = 10 }) => {
  return (
    <Icon
      as={MaterialIcons}
      name={icon}
      size={size}
      color={colors[theme].icon}
      padding="0"
    />
  );
};

export default IconBadge;
