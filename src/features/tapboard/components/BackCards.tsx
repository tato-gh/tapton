import type { FC } from 'react';
import { useState, useEffect } from 'react';

import BackCard from './BackCard';
import type { Card } from '@domains/tapboard/types/card';
import { randomPick } from '@utils/array';
import getCards from '@domains/tapboard/sql/getCards';

const BackCards: FC = () => {
  const [queue, setQueue] = useState<Card[]>([]);

  useEffect(() => {
    // tmp data
    const cards = getCards();
    const numCards = cards.length;
    setQueue(randomPick(cards, numCards));
  }, []);

  const onPress = () => {
    setQueue(([_card, ...rest]) => rest);
  };

  return (
    <>
      {queue.map((card, ind) => {
        return (
          <BackCard
            key={card.id}
            title={card.title}
            content={card.content}
            zIndex={999 - ind}
            focus={card.id == queue[0].id ? true : false}
            onPress={onPress}
          />
        );
      })}
    </>
  )
};

export default BackCards;
