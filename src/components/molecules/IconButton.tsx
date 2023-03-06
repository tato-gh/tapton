import type { FC } from 'react';
import colors, { type ThemeName } from '@constants/colors';
import { Pressable, Icon, Text } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type Props = {
  theme: ThemeName;
  icon: any;
  label: string;
  onPress: any;
  size?: number;
};

const IconButton: FC<Props> = ({ theme, icon, label, onPress, size = 10 }) => {
  return (
    <Pressable justifyContent="center" alignItems="center" onPress={onPress}>
      <Icon
        as={MaterialIcons}
        name={icon}
        size={size}
        color={colors[theme].icon}
        backgroundColor={colors[theme].iconBackground}
        padding="0"
      />
      <Text color={colors[theme].iconLabel} fontSize={size}>
        {label}
      </Text>
    </Pressable>
  );
};

export default IconButton;
