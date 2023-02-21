import AsyncStorage from '@react-native-async-storage/async-storage';

import type { CardFull } from './../types/card';
import type { CardReborn } from './../types/cardReborn';
import { getToday, addMinute, getStartOfDate } from '@utils/date';

export const getCardReborns = async () => {
  const jsonValue = await AsyncStorage.getItem('@cardReborns');
  return (jsonValue) ? JSON.parse(jsonValue) : [];
};

export const getWaitingCardReborns = async () => {
  const reborns: CardReborn[] = await getCardReborns();
  const cTime = (new Date().getTime());

  return reborns.filter((reborn) => {
    const showTime = (new Date(reborn.nextShowTime)).getTime();
    const limitTime = (new Date(reborn.limitShowTime)).getTime();

    return cTime >= showTime && cTime <= limitTime;
  });
};

export const upsertCardReborns = async (card: CardFull) => {
  if(!card.reborn || !card.intervalMin) { return null; }

  const today = getToday();
  const nextShowTime = addMinute(today, card.intervalMin);
  const limitShowTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    card.limitHour,
    card.limitMinute
  );

  // NOTE
  // この時点でlimitShowTimeを過ぎている可能性があるが、ここではそのまま入れることでストレージを更新する
  // なお、不要なものの削除は、getWaitingCardReborns()で行われる
  const attrs: CardReborn = {
    cardId: card.id,
    nextShowTime: nextShowTime.toString(),
    limitShowTime: limitShowTime.toString()
  };

  let reborns: CardReborn[] = await getCardReborns();
  reborns = reborns.reduce(
    (acc, reborn) => { return (reborn.cardId == card.id ? acc : [reborn, ...acc]) },
    [attrs]
  );
  await AsyncStorage.setItem('@cardReborns', JSON.stringify(reborns));

  return 'ok';
};

export const removePrevCardReborns = async () => {
  let reborns: CardReborn[] = await getCardReborns();
  const todayStartTime = getStartOfDate(getToday());

  reborns = reborns.filter((reborn) => {
    const nextShowTime = new Date(reborn.nextShowTime);

    return nextShowTime.getTime() > todayStartTime.getTime();
  });
  await AsyncStorage.setItem('@cardReborns', JSON.stringify(reborns));

  return 'ok';
};
