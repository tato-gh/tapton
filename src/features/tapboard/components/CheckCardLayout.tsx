import type { FC } from 'react';
import { useMemo, useState, useLayoutEffect } from 'react';
import { Dimensions } from 'react-native';

import { OPE_BOTTOM_POSITION, CARD_WIDTH } from '../constants';
import type { QueueCard } from '../types/queueCard';
import { getPosition } from '../utils/position';
import CheckCardForm from './CheckCardForm';
import CheckCardView from './CheckCardView';

type Props = {
  queueCard: QueueCard;
  focus: boolean;
  onPress: Function;
  onPressSkip: Function;
};

// maxHeight: 以下を考慮して決定
// - フットメニューと被らないこと
// - カード回転（ただし直角にはならない）
const maxHeight =
  Dimensions.get('window').height - OPE_BOTTOM_POSITION - 0.85 * CARD_WIDTH;
const maxWidth = Dimensions.get('window').width - CARD_WIDTH;

const CheckCardLayout: FC<Props> = ({
  queueCard,
  focus,
  onPress,
  onPressSkip,
}) => {
  const [central, setCentral] = useState(focus);

  useLayoutEffect(() => {
    setCentral(focus)
  }, [focus])

  const position = useMemo(
    () => getPosition(maxHeight, maxWidth, central),
    [central]
  );

  return (
    <>
      <CheckCardView
        queueCard={queueCard}
        position={position}
        focus={focus}
        central={central}
      />

      {focus && <CheckCardForm onPress={onPress} onPressSkip={onPressSkip} />}
    </>
  );
};

export default CheckCardLayout;
