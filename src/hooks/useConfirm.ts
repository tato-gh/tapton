import { Alert, Platform } from "react-native";

const useConfirm = (message: string) => {
  const onMobile = (onPress: Function) => {
    Alert.alert(
      "操作確認",
      message,
      [
        {
          text: "はい",
          onPress: () => {
            onPress();
          },
        },
        {
          text: "いいえ",
        },
      ]
    );
  };

  const onWeb = (onPress: Function) => {
    const result = window.confirm(["操作確認", message].join('\n'))
    if (result) {
      onPress();
    }
  };

  return Platform.OS === 'web' ? onWeb : onMobile;
};

export default useConfirm;
