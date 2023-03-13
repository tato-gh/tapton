import { View } from 'react-native';
import { Text } from 'native-base';
import { A } from '@expo/html-elements';
import * as Linking from 'expo-linking';

import type { QueueCard } from '../types/queueCard';

const useCardAttachmentWeb = (queueCard: QueueCard) => {
  if(queueCard.attachment != "web") {
    return [null, () => {}];
  }

  const dom = (
    <View>
      <Text fontSize="xl" color="blue.500">
        <A href={queueCard.attachmentBody}>
          Webサイトを開く
        </A>
      </Text>
    </View>
  );

  const onPress = () => {
    Linking.openURL(queueCard.attachmentBody);
  };

  return [dom, onPress];
};

export default useCardAttachmentWeb;
