import type { FC } from 'react';
import { useState, useLayoutEffect } from 'react';

import { getCardsFullLoaded } from '@domains/tapboard/storage/cards';
import type { Card } from '@domains/tapboard/types/card';
import CardList from './CardList';

const CardLister: FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useLayoutEffect(() => {
    (async () => {
      const cards = await getCardsFullLoaded();
      if(cards) {
        setCards(() => { return cards; });
      }
    })();
  }, []);

  return <CardList cards={cards} />
};

export default CardLister;
