import type { FC } from 'react';

import type { QueueCard } from '../types/queueCard';
import CheckCardLayout from './CheckCardLayout';

type Props = {
  queue: QueueCard[],
  onPress: Function,
  onPressSkip: Function
};

const CheckList: FC<Props> = ({ queue, onPress, onPressSkip }) => {
  return (
    <>
      {queue.map((queueCard, ind) => {
        return (
          <CheckCardLayout
            key={queueCard.no}
            queueCard={queueCard}
            focus={ind == 0 ? true : false}
            onPress={() => onPress(queueCard)}
            onPressSkip={() => onPressSkip(queueCard)}
          />
        );
      })}
    </>
  )
};

export default CheckList;
