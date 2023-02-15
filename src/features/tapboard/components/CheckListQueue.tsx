import type { FC } from 'react';
import { useState, useLayoutEffect } from 'react';

import { getCards } from '@domains/tapboard/storage/cards';
import type { QueueCard } from '../types/queueCard';
import CheckList from './CheckList';
import { randomPick } from '@utils/array';

const CheckListQueue: FC = () => {
  const [queue, setQueue] = useState<QueueCard[]>([]);

  useLayoutEffect(() => {
    (async () => {
      const cards = await getCards();
      if(cards) {
        const numCards = cards.length;
        setQueue(() => {
          return (
            randomPick(cards, numCards)
              .map((queueCard, ind) => Object.assign(queueCard, {no: ind}))
          );
        })
      }
    })();
  }, []);

  const onPress = (queueCard: QueueCard) => {
    setQueue(([_card, ...rest]) => rest);
    if(queueCard.reborn) {
      setTimeout(() => {
        setQueue((queue) => [queueCard, ...queue])
      }, queueCard.intervalMin * 60 * 1000);
    }
  };

  return <CheckList queue={queue} onPress={onPress} />
};

export default CheckListQueue;
