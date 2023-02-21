import type { FC } from 'react';
import { useMemo } from 'react';
import { Dimensions } from 'react-native';

import { getPosition } from '../utils/position';
import { OPE_BOTTOM_POSITION, CARD_WIDTH } from '../constants';
import type { QueueCard } from '../types/queueCard';
import CheckCardView from './CheckCardView';
import CheckCardForm from './CheckCardForm';

type Props = {
  queueCard: QueueCard,
  focus: boolean,
  onPress: Function,
  onPressSkip: Function,
};

// maxHeight: 以下を考慮して決定
// - フットメニューと被らないこと
// - カード回転（ただし直角にはならない）
const maxHeight = Dimensions.get('window').height - OPE_BOTTOM_POSITION - 0.85 * CARD_WIDTH;
const maxWidth = Dimensions.get('window').width - CARD_WIDTH;

const CheckCardLayout: FC<Props> = ({ queueCard, focus, onPress, onPressSkip }) => {
  const position = useMemo(() => getPosition(maxHeight, maxWidth), []);

  return (
    <>
      <CheckCardView queueCard={queueCard} position={position} focus={focus} />

      {focus &&
        <CheckCardForm onPress={onPress} onPressSkip={onPressSkip} />
      }
    </>
  )
};

export default CheckCardLayout;
