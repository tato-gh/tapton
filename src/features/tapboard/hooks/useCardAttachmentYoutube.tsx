import { useRef, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Button } from 'native-base';
import YoutubePlayer from 'react-native-youtube-iframe';

import type { QueueCard } from '../types/queueCard';

const maxCardWidth = Dimensions.get('window').width;
const maxCardHeight = (maxCardWidth / 16) * 9;

const useCardAttachmentWeb = (queueCard: QueueCard, central: boolean) => {
  const av = useRef(null);
  const [playing, setPlaying] = useState(false);

  if(queueCard.attachment != "youtube") {
    return [null, () => {}];
  }

  const onPress = () => {
    setPlaying((prev) => !prev);
  };

  const dom = (
    <View>
      <YoutubePlayer ref={av}
        height={central ? maxCardHeight : 135}
        width={central ? '100%' : 240}
        play={playing}
        videoId={queueCard.attachmentBody}
        onChangeState={(state) =>
          { state == 'ended' ? setPlaying(false) : ''; }
        }
      />
      <Button onPress={onPress}>
        {playing ? 'Pause' : 'Play'}
      </Button>
    </View>
  );

  return [dom, onPress];
};

export default useCardAttachmentWeb;
