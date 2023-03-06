import type { FC } from 'react';
import { buildItemsSelf } from '@utils/array';
import { HStack } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


const HOURS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

type Props = {
  value: any;
  onValueChange: Function;
};

const HourMinuteSelect: FC<Props> = ({ value, onValueChange }) => {
  const hour = value[0];
  const minute = value[1];

  return (
    <View style={styles.container}>
      <HStack space={1} alignItems="center">
        <RNPickerSelect
          onValueChange={(value) => {
            if (value != hour) {
              onValueChange([Number(value), minute]);
            }
          }}
          items={buildItemsSelf(HOURS)}
          value={hour}
          placeholder={{}}
          useNativeAndroidPickerStyle={false}
        />
        <Text>時</Text>
        <RNPickerSelect
          onValueChange={(value) => {
            if (value != minute) {
              onValueChange([hour, Number(value)]);
            }
          }}
          items={buildItemsSelf(MINUTES)}
          value={minute}
          placeholder={{}}
          useNativeAndroidPickerStyle={false}
        />
        <Text>分</Text>
      </HStack>
    </View>
  );
};

export default HourMinuteSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    paddingHorizontal: 4,
  },
});
