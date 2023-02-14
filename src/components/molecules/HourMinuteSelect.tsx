import type { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const HOURS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
];

const MINUTES = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
];

const buildItems = (list: Array<number>): any => {
  return list.map((v) => { return { label: `${v}`, value: v } });
};

type Props = {
  value: any,
  onValueChange: Function
}

const HourMinuteSelect: FC<Props> = ({ value, onValueChange }) => {
  const hour = value[0];
  const minute = value[1];

  return(
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => {
          if(value != hour) {
            onValueChange([Number(value), minute]);
          }
        }}
        items={buildItems(HOURS)}
        value={hour}
        placeholder={{}}
      />
      <Text>時</Text>
      <RNPickerSelect
        onValueChange={(value) => {
          if(value != minute) {
            onValueChange([hour, Number(value)]);
          }
        }}
        items={buildItems(MINUTES)}
        value={minute}
        placeholder={{}}
      />
      <Text>分</Text>
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
    paddingHorizontal: 4
  }
});
