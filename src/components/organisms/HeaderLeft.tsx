import type { FC } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View } from 'react-native';
import IconButton from "@molecules/IconButton";

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
    <View style={{ marginLeft: 15 }}>
      <IconButton
        theme='muted'
        icon='arrow-back'
        label=''
        size={5}
        onPress={onPress}
      />
    </View>
  );
};

export default HeaderLeft;
