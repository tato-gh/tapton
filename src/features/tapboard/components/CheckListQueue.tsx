import type { FC } from 'react';
import { useState, useEffect } from 'react';

import getCards from '@domains/tapboard/sql/getCards';
import type { QueueCard } from '../types/queue_card';
import CheckList from './CheckList';
import { randomPick } from '@utils/array';

const CheckListQueue: FC = () => {
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

  return <CheckList queue={queue} onPress={onPress} />
};

export default CheckListQueue;
