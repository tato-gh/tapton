import type { FC } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  theme: string,
  icon: any,
  onPress: any,
  size?: number
};

const themeColor: {[parameter: string]: string} = {
  'primary': '#ffd33d'
};

const CircleButton: FC<Props> = ({ theme, icon, onPress, size = 38 }) => {
  return (
    <View style={[styles.container, { borderColor: themeColor[theme] }]}>
      <Pressable style={styles.button} onPress={onPress}>
        <MaterialIcons name={icon} size={size} color='#25292e' />
      </Pressable>
    </View>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderRadius: 42,
    padding: 3,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
  },
});
