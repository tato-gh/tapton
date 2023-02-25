import type { FC } from 'react';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import { Box, Heading, Text, Button } from 'native-base';
import { A } from '@expo/html-elements';
import { Video } from 'expo-av';
import type { AVPlaybackStatus } from 'expo-av';
import YoutubePlayer from "react-native-youtube-iframe";

import type { Position } from '../utils/position';
import { MAX_Z_INDEX } from '../constants';
import type { QueueCard } from '../types/queueCard';

type Props = {
  queueCard: QueueCard,
  position: Position,
  focus: boolean
};

const CheckCardView: FC<Props> = ({ queueCard, position, focus }) => {
  const av = useRef(null);
  const [avStatus, setAvStatus] = useState<AVPlaybackStatus | null>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <View
      style={{ position: 'absolute', top: position.top, left: position.left, zIndex: (focus ? MAX_Z_INDEX : MAX_Z_INDEX - queueCard.no), transform: [{rotate: `${position.rotate}deg`}]}}
    >
      <Box
        bg={focus ? '#FEFEFE' : '#888'}
        borderRadius='5'
        rounded='md'
        borderWidth={focus ? '4' : '0'}
        borderColor={focus ? 'blue.500' : ''}
        py='4'
        px='5'
      >
        <Heading size="sm" ml="-1">
          {queueCard.title}
        </Heading>
        <Text fontSize='2xl'>
          {queueCard.body}
        </Text>

        {queueCard.attachment == 'web' && (
          <Text fontSize='xl' color='blue.500'>
            <A href={queueCard.attachmentBody}>Webリンク</A>
          </Text>
        )}

        {queueCard.attachment == 'audio' && (
          <View>
            <Text fontSize='xl'>{queueCard.attachmentLabel}</Text>
            <Video
              ref={av}
              source={{ uri: queueCard.attachmentBody }}
              usePoster={false}
              useNativeControls={true}
              isLooping={false}
              resizeMode={'contain'}
              onPlaybackStatusUpdate={status => setAvStatus(() => status)}
            />
            {av.current && (
              <Button
                onPress={() =>
                  avStatus?.isPlaying ? av.current.pauseAsync() : av.current.playAsync()
                }
              >
                {avStatus?.isPlaying ? 'Pause' : 'Play'}
              </Button>
            )}
          </View>
        )}

        {queueCard.attachment == 'youtube' && (
          <View>
            <YoutubePlayer
              ref={av}
              height={135}
              width={240}
              play={playing}
              videoId={queueCard.attachmentBody}
              onChangeState={state => state == "ended" ? setPlaying(false) : ""}
            />
            <Button onPress={() => setPlaying((prev) => !prev)}>
              {playing ? "Pause" : "Play"}
            </Button>
          </View>
        )}
      </Box>
    </View>
  );
};

export default CheckCardView;
