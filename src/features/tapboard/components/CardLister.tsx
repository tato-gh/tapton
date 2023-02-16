import type { FC } from 'react';
import { useState, useLayoutEffect } from 'react';

import { getCardsFullLoaded } from '@domains/tapboard/storage/cards';
import type { CardFull } from '@domains/tapboard/types/card';
import CardList from './CardList';

const CardLister: FC = () => {
  const [cards, setCards] = useState<CardFull[]>([]);

  const sorter = (a: CardFull, b: CardFull) => {
    return (
      [a.daily, a.useDates, a.Days, a.title, a.body] >
      [b.daily, b.useDates, b.Days, b.title, b.body]
    )
  };

  useLayoutEffect(() => {
    (async () => {
      const cards = await getCardsFullLoaded();
      if(cards) {
        setCards(() => { return cards.sort(sorter); });
      }
    })();
  }, []);

  return <CardList cards={cards} />
};

export default CardLister;
