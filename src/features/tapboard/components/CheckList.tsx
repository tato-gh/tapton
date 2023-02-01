import type { FC } from 'react';

import type { QueueCard } from '../types/queue_card';
import CheckCardLayout from './CheckCardLayout';

type Props = {
  queue: QueueCard[],
  onPress: Function
};

const CheckList: FC<Props> = ({ queue, onPress }) => {

  return (
    <>
      {queue.map((queueCard, ind) => {
        return (
          <CheckCardLayout
            key={queueCard.no}
            queueCard={queueCard}
            focus={ind == 0 ? true : false}
            onPress={() => onPress(queueCard)}
          />
        );
      })}
    </>
  )
};

export default CheckList;
