import { createNotification } from '@domains/device/notifications/local';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getToday, addMinute, getStartOfDate } from '@utils/date';
import type { CardFull } from './../types/card';
import type { CardReborn } from './../types/cardReborn';

export const getCardReborns = async () => {
  const jsonValue = await AsyncStorage.getItem('@cardReborns');

  return jsonValue ? JSON.parse(jsonValue) : [];
};

export const getWillCardReborns = async () => {
  const reborns: CardReborn[] = await getCardReborns();
  const cTime = new Date().getTime();

  return reborns.filter((reborn) => {
    const showTime = new Date(reborn.nextReshowTime).getTime();

    return cTime < showTime;
  });
};

export const getRebornedCardReborns = async () => {
  const reborns: CardReborn[] = await getCardReborns();
  const cTime = new Date().getTime();

  return reborns.filter((reborn) => {
    const showTime = new Date(reborn.nextReshowTime).getTime();
    const limitTime = new Date(reborn.limitShowTime).getTime();

    return cTime >= showTime && cTime <= limitTime;
  });
};

export const getDictByCardId = async () => {
  const cardReborns: CardReborn[] = await getCardReborns();

  return cardReborns.reduce((acc, reborn) => {
    return Object.assign(acc, { [reborn.cardId]: reborn });
  }, {});
};

export const upsertCardReborns = async (card: CardFull) => {
  if (!card.reborn || !card.intervalMin) {
    return null;
  }

  const today = getToday();
  const nextShowTime = addMinute(today, card.intervalMin);
  const limitShowTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    card.limitHour,
    card.limitMinute
  );

  if (nextShowTime.getTime() > limitShowTime.getTime()) {
    // 不要なものの削除は、getWaitingCardReborns()で行われる
    return;
  }

  const attrs: CardReborn = {
    cardId: card.id,
    nextReshowTime: nextShowTime.toString(),
    limitShowTime: limitShowTime.toString(),
  };

  let reborns: CardReborn[] = await getCardReborns();
  reborns = reborns.reduce(
    (acc, reborn) => {
      return reborn.cardId == card.id ? acc : [reborn, ...acc];
    },
    [attrs]
  );
  await AsyncStorage.setItem('@cardReborns', JSON.stringify(reborns));

  // 通知設定
  if (card.notification) {
    await createNotification({
      content: {
        title: card.title,
        body: card.body,
        data: { cardId: card.id },
      },
      trigger: nextShowTime.getTime(),
    });
  }

  return 'ok';
};

export const removeCardRebornByCardId = async (cardId: string) => {
  let reborns: CardReborn[] = await getCardReborns();

  reborns = reborns.filter((reborn) => reborn.cardId != cardId);
  await AsyncStorage.setItem('@cardReborns', JSON.stringify(reborns));

  return 'ok';
};

export const removePrevCardReborns = async () => {
  let reborns: CardReborn[] = await getCardReborns();
  const todayStartTime = getStartOfDate(getToday());

  reborns = reborns.filter((reborn) => {
    const nextReshowTime = new Date(reborn.nextReshowTime);

    return nextReshowTime.getTime() > todayStartTime.getTime();
  });
  await AsyncStorage.setItem('@cardReborns', JSON.stringify(reborns));

  return 'ok';
};
