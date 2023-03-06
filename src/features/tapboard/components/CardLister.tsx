import type { FC } from 'react';
import { useState, useLayoutEffect } from 'react';
import {
  getCardsFullLoaded,
  deleteCard,
  initCards,
} from '@domains/tapboard/storage/cards';
import type { CardFull } from '@domains/tapboard/types/card';
import useConfirm from '@hooks/useConfirm';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { UUID } from 'uuidjs';

import CardList from './CardList';

const CardLister: FC = () => {
  const [cards, setCards] = useState<CardFull[] | null>(null);
  const navigation = useNavigation();
  const showDeleteConfirm = useConfirm('削除しますか？');

  const sorter = (a: CardFull, b: CardFull) => {
    const aKey = [a.daily, a.useDays, a.useDates, a.title, a.body];
    const bKey = [b.daily, b.useDays, b.useDates, b.title, b.body];

    if (aKey > bKey) {
      return -1;
    }
    if (aKey < bKey) {
      return 1;
    }

    return 0;
  };

  const onNew = () => { navigation.navigate('NewCard', {}); };

  const onEdit = (cardId: string) =>
    { navigation.navigate('EditCard', { cardId }); };

  const onDelete = (cardId: string) => {
    showDeleteConfirm(async () => {
      await deleteCard(cardId);
      navigation.replace('Cards', { refreshKey: UUID.generate() });
    });
  };

  const onInit = () => {
    (async () => {
      await initCards();
      navigation.replace('Cards', { refreshKey: UUID.generate() });
    })();
  };

  useLayoutEffect(() => {
    (async () => {
      const cards = await getCardsFullLoaded();
      if (cards) {
        setCards(() => {
          return cards.sort(sorter);
        });
      }
    })();
  }, []);

  if (!cards) {
    return <ActivityIndicator size="large" style={{ margin: 20 }} />;
  }

  return (
    <CardList
      cards={cards}
      onNew={onNew}
      onEdit={onEdit}
      onDelete={onDelete}
      onInit={onInit}
    />
  );
};

export default CardLister;
