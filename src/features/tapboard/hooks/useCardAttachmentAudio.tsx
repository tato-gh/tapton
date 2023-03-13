import { useState, useRef } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'native-base';
import { Video } from 'expo-av';
import type { AVPlaybackStatus } from 'expo-av';

import type { QueueCard } from '../types/queueCard';

const useCardAttachmentWeb = (queueCard: QueueCard) => {
  const [avStatus, setAvStatus] = useState<AVPlaybackStatus | null>(null);
  const av = useRef(null);

  if(queueCard.attachment != "audio") {
    return [null, () => {}];
  }

  const onPress = () => {
    avStatus?.isPlaying
      ? av.current.pauseAsync()
      : av.current.playAsync()
  };

  const dom = (
    <View>
      <Text fontSize="xl">{queueCard.attachmentLabel}</Text>
      <Video
        ref={av}
        source={{ uri: queueCard.attachmentBody }}
        usePoster={false}
        useNativeControls={true}
        isLooping={false}
        resizeMode={'contain'}
        onPlaybackStatusUpdate={(status) => { setAvStatus(() => status); }}
      />
      <Button onPress={onPress}>
        {avStatus?.isPlaying ? 'Pause' : 'Play'}
      </Button>
    </View>
  );

  return [dom, onPress];
};

export default useCardAttachmentWeb;
