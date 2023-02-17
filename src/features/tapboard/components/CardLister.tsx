import type { FC } from 'react';
import { useState, useLayoutEffect } from 'react';

import { getCardsFullLoaded } from '@domains/tapboard/storage/cards';
import type { CardFull } from '@domains/tapboard/types/card';
import CardList from './CardList';

const CardLister: FC = () => {
  const [cards, setCards] = useState<CardFull[]>([]);

  const sorter = (a: CardFull, b: CardFull) => {
    const aKey = [a.daily, a.useDays, a.useDates, a.title, a.body];
    const bKey = [b.daily, b.useDays, b.useDates, b.title, b.body];

    if(aKey > bKey) { return 1; }
    if(aKey < bKey) { return 1; }
    return 0;
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
