import type { FC } from 'react';
import { useState, useEffect } from 'react';

import type { QueueCard } from '../types/queue_card';
import BackCard from './BackCard';
import { randomPick } from '@utils/array';
import getCards from '@domains/tapboard/sql/getCards';

const BackCards: FC = () => {
  const [queue, setQueue] = useState<QueueCard[]>([]);

  useEffect(() => {
    // tmp data
    const cards = getCards();
    const numCards = cards.length;
    setQueue(() => {
      return (
        randomPick(cards, numCards)
          .map((queueCard, ind) => Object.assign(queueCard, {no: ind}))
      );
    })
  }, []);

  const onPress = () => {
    setQueue(([_card, ...rest]) => rest);
  };

  return (
    <>
      {queue.map((queueCard, ind) => {
        return (
          <BackCard
            key={queueCard.no}
            queueCard={queueCard}
            focus={ind == 0 ? true : false}
            onPress={onPress}
          />
        );
      })}
    </>
  )
};

export default BackCards;
