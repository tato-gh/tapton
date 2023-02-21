import type { FC } from 'react';
import { useState, useLayoutEffect } from 'react';

import { getWaitingCards, updateNextShowTime, getWaitingCardsReborned } from '@domains/tapboard/storage/cards';
import { upsertCardReborns } from '@domains/tapboard/storage/cardReborns';
import type { QueueCard } from '../types/queueCard';
import CheckList from './CheckList';
import { randomPick } from '@utils/array';

const CheckListQueue: FC = () => {
  const [queue, setQueue] = useState<QueueCard[]>([]);

  useLayoutEffect(() => {
    (async () => {
      const cards = await getWaitingCards();
      const numCards = cards.length;
      const cardsReborned = await getWaitingCardsReborned();
      const numReborns = cardsReborned.length;

      setQueue(() => {
        const queueReborns = randomPick(cardsReborned, numReborns).map((queueCard, ind) => {
          return Object.assign(queueCard, {no: ind, reborned: true});
        });

        const queueCards = randomPick(cards, numCards).map((queueCard, ind) => {
          return Object.assign(queueCard, {no: ind + numReborns, reborned: false});
        });

        return [...queueReborns, ...queueCards];
      })
    })();
  }, []);

  const onPress = async (queueCard: QueueCard) => {
    setQueue(([_card, ...rest]) => rest);
    if(!queueCard.reborned) {
      await updateNextShowTime(queueCard);
    }
    if(queueCard.reborn) {
      await upsertCardReborns(queueCard);
    }
  };

  return <CheckList queue={queue} onPress={onPress} />
};

export default CheckListQueue;
