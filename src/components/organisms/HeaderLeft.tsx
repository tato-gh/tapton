import type { FC } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Box } from 'native-base';
import IconFlat from "@molecules/IconFlat";

type Props = {
  backTo?: string,
  options?: any
};

const HeaderLeft: FC<Props> = ({ backTo = null, options = {} }) => {
  const navigation = useNavigation();

  const onPress = () => {
    backTo ? navigation.navigate(backTo, options) : navigation.goBack();
  };

  return (
    <Box mr={2} ml={2}>
      <IconFlat
        theme='muted'
        icon='arrow-back'
        size={6}
        onPress={onPress}
      />
    </Box>
  );
};

export default HeaderLeft;
