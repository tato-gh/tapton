import type { FC } from 'react';
import { useState, useLayoutEffect, useCallback } from 'react';
import { AppState } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { UUID } from 'uuidjs';

import { getWaitingCards, updateNextShowTime, getCardsReborned, getCardsWillReborn } from '@domains/tapboard/storage/cards';
import { upsertCardReborns, getDictByCardId } from '@domains/tapboard/storage/cardReborns';
import type { CardReborn } from '@domains/tapboard/types/cardReborn';
import type { QueueCard } from '../types/queueCard';
import CheckList from './CheckList';
import { randomPick } from '@utils/array';

const CheckListQueue: FC = () => {
  const [queue, setQueue] = useState<QueueCard[]>([]);
  const navigation = useNavigation();

  const handleAppStateChange = (nextAppState: string) => {
    if(nextAppState == 'active') {
      navigation.navigate('Home', {refreshKey: UUID.generate()});
    }
  };

  useLayoutEffect(() => {
    (async () => {
      const cards = await getWaitingCards();
      const notifiedCards = cards.filter(c => c.notification);
      const nonNotifiedCards = cards.filter(c => !c.notification);
      const cardsReborned = await getCardsReborned();
      const numCards = cards.length;
      const numNotifiedCards = notifiedCards.length;
      const numNonNotifiedCards = nonNotifiedCards.length;
      const numReborns = cardsReborned.length;
      const cardsReborn = await getCardsWillReborn();

      setQueue(() => {
        const queueReborns = randomPick(cardsReborned, cardsReborned.length).map((card, ind) => {
          return Object.assign(card, {no: ind + 1, reborned: true});
        });

        const queueNotifiedCards = randomPick(notifiedCards, numNotifiedCards).map((card, ind) => {
          return Object.assign(card, {no: ind + 1 + numReborns, reborned: false});
        });

        const queueNonNotifiedCards = randomPick(nonNotifiedCards, numNonNotifiedCards).map((card, ind) => {
          return Object.assign(card, {no: ind + 1 + numReborns + numNotifiedCards, reborned: false});
        });

        return [...queueNotifiedCards, ...queueReborns, ...queueNonNotifiedCards];
      })

      if(cardsReborn.length != 0){
        // 再表示のためのタイマーセット
        const cTime = (new Date()).getTime();
        const dictByCardId = await getDictByCardId();

        cardsReborn.forEach((card, ind) => {
          const cardReborn: CardReborn = dictByCardId[card.id];
          if(!cardReborn) { return; }

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

  useFocusEffect(
    // NOTE: useEffect()ではnavigate()でアンマウントが実行されない
    useCallback(() => {
      const listener = AppState.addEventListener("change", handleAppStateChange);

      return () => { listener.remove(); };
    }, [])
  );

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

  const onPressSkip = async (queueCard: QueueCard) => {
    setQueue(([card, ...rest]) => [...rest, card]);
  };

  return (
    <CheckList
      queue={queue}
      onPress={onPress}
      onPressSkip={onPressSkip}
    />
  );
};

export default CheckListQueue;
