import type { FC } from 'react';
import { useState, useLayoutEffect } from 'react';

import { getWaitingCards, updateNextShowTime, getCardsReborned, getCardsWillReborn } from '@domains/tapboard/storage/cards';
import { upsertCardReborns, getDictByCardId } from '@domains/tapboard/storage/cardReborns';
import type { CardReborn } from '@domains/tapboard/types/cardReborn';
import type { QueueCard } from '../types/queueCard';
import CheckList from './CheckList';
import { randomPick } from '@utils/array';

const CheckListQueue: FC = () => {
  const [queue, setQueue] = useState<QueueCard[]>([]);

  useLayoutEffect(() => {
    (async () => {
      const cards = await getWaitingCards();
      const numCards = cards.length;
      const cardsReborned = await getCardsReborned();
      const numReborns = cardsReborned.length;
      const cardsReborn = await getCardsWillReborn();

      setQueue(() => {
        const queueReborns = randomPick(cardsReborned, numReborns).map((card, ind) => {
          return Object.assign(card, {no: ind, reborned: true});
        });

        const queueCards = randomPick(cards, numCards).map((card, ind) => {
          return Object.assign(card, {no: ind + numReborns, reborned: false});
        });

        return [...queueReborns, ...queueCards];
      })

      if(cardsReborn.length != 0){
        // 再表示のためのタイマーセット
        const cTime = (new Date()).getTime();
        const dictByCardId: Map<string, CardReborn> = await getDictByCardId();

        cardsReborn.forEach((card, ind) => {
          const cardReborn = dictByCardId[card.id];
          const showTime = new Date(cardReborn.nextReshowTime).getTime();
          const offtimeToShow = showTime - cTime;
          const no = (ind + numReborns + numCards);
          const queueCard = Object.assign(card, {no: no, reborned: true});

          setTimeout(() => {
            setQueue((queue) => [queueCard, ...queue])
          }, offtimeToShow);
        });
      }
    })();
  }, []);

  const onPress = async (queueCard: QueueCard) => {
    setQueue(([_card, ...rest]) => rest);
    if(!queueCard.reborned) {
      await updateNextShowTime(queueCard);
    }
    if(queueCard.reborn) {
      await upsertCardReborns(queueCard);

      setTimeout(() => {
        setQueue((queue) => [queueCard, ...queue])
      }, queueCard.intervalMin * 60 * 1000);
    }
  };

  return <CheckList queue={queue} onPress={onPress} />
};

export default CheckListQueue;
