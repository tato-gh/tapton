import type { FC } from 'react';
import { useState, useLayoutEffect } from 'react';

import { getWaitingCards } from '@domains/tapboard/storage/cards';
import type { QueueCard } from '../types/queueCard';
import CheckList from './CheckList';
import { randomPick } from '@utils/array';

const CheckListQueue: FC = () => {
  const [queue, setQueue] = useState<QueueCard[]>([]);

  useLayoutEffect(() => {
    (async () => {
      const cards = await getWaitingCards();
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
      // TODO: 再表示用のキューに追加
    }
  };

  return <CheckList queue={queue} onPress={onPress} />
};

export default CheckListQueue;
