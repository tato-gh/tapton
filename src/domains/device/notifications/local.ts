import * as Notifications from 'expo-notifications';
import type { DateTriggerInput } from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

type Content = {
  title: string;
  body: string;
  data: {
    cardId: string;
  };
};

type Args = {
  content: Content;
  trigger: DateTriggerInput;
};

export const createNotification = async ({ content, trigger }: Args) => {
  const status = await requestPermissionsAsync();

  if(status == 'granted' && trigger >= Date.now()) {
    if(Platform.OS == 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX
      });
    }

    await Notifications.scheduleNotificationAsync({ content, trigger });
  }
};

const requestPermissionsAsync = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus;
};
