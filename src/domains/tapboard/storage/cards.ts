import {
  createNotification,
  removeNotifications,
} from '@domains/device/notifications/local';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getIsToday,
  getToday,
  getYesterday,
  getEndOfDate,
  addDate,
  getNextDayDate,
  getNextDateDate,
} from '@utils/date';
import { UUID } from 'uuidjs';

import type { Card, CardFull } from './../types/card';
import type { CardContent } from './../types/cardContent';
import type { CardPlan } from './../types/cardPlan';
import type { CardReborn } from './../types/cardReborn';
import {
  getCardContent,
  getStoreKey as getContentStoreKey,
} from './cardContents';
import { getCardPlan, getStoreKey as getPlanStoreKey } from './cardPlans';
import {
  removePrevCardReborns,
  getWillCardReborns,
  getRebornedCardReborns,
  removeCardRebornByCardId,
} from './cardReborns';

export const getCard = async (cardId: string) => {
  const cards: Card[] = await getCards();

  return cards.find((card) => card.id == cardId);
};

export const getCardFullLoaded = async (cardId: string) => {
  const card = await getCard(cardId);
  const content = await getCardContent(cardId);
  const plan = await getCardPlan(cardId);
  const cardFull: CardFull = Object.assign({}, card, content, plan);

  return cardFull;
};

export const getCards = async () => {
  return (await getStorageItem('@cards')) || [];
};

export const getCardsByIds = async (cardIds: string[]) => {
  const cards: Card[] = await getCards();

  return cards.filter((card) => cardIds.includes(card.id));
};

export const getCardsWillReborn = async () => {
  await removePrevCardReborns();
  const cardReborns: CardReborn[] = await getWillCardReborns();
  const cardIds = cardReborns.map((r) => r.cardId);
  const cards = await getCardsByIds(cardIds);

  return await decorateCardsFullLoaded(cards);
};

export const getCardsReborned = async () => {
  await removePrevCardReborns();
  const cardReborns: CardReborn[] = await getRebornedCardReborns();
  const cardIds = cardReborns.map((r) => r.cardId);
  const cards = await getCardsByIds(cardIds);

  return await decorateCardsFullLoaded(cards);
};

export const getCardsFullLoaded = async () => {
  const cards: Card[] = await getCards();

  return await decorateCardsFullLoaded(cards);
};

export const decorateCardsFullLoaded = async (cards: Card[]) => {
  const [contentKeys, planKeys] = cards.reduce(
    (keys: string[][], card) => {
      const [cKeys, pKeys] = keys;
      const contentKey: string = getContentStoreKey(card.id);
      const planKey: string = getPlanStoreKey(card.id);

      return [
        [...cKeys, contentKey],
        [...pKeys, planKey],
      ];
    },
    [[], []]
  );
  const dictContent = await buildDict<CardContent>(contentKeys);
  const dictPlan = await buildDict<CardPlan>(planKeys);

  const cardsFull = cards.map((card) => {
    const content = dictContent[card.id];
    const plan = dictPlan[card.id];

    return Object.assign({}, card, content, plan);
  });

  return cardsFull;
};

// ボードへの表示対象カードを返す
// まず、前日までの指定カードは新しい表示日時に更新する
// そのあとで、現在表示対象にあたるカードをみつける
export const getWaitingCards = async () => {
  await updateOldCardsWating();
  const cards = await getWaitingCardsOnTime();

  return await decorateCardsFullLoaded(cards);
};

const updateOldCardsWating = async () => {
  let cards: Card[] = await getCards();
  const onTime = new Date();
  const endOfYesterday = getEndOfDate(getYesterday());

  const targets = filterNextShowTimePast(cards, onTime);
  const [contentKeys, planKeys] = targets.reduce(
    (keys: string[][], card) => {
      const [cKeys, pKeys] = keys;
      const contentKey: string = getContentStoreKey(card.id);
      const planKey: string = getPlanStoreKey(card.id);

      return [
        [...cKeys, contentKey],
        [...pKeys, planKey],
      ];
    },
    [[], []]
  );
  const dictContent = await buildDict<CardContent>(contentKeys);
  const dictPlan = await buildDict<CardPlan>(planKeys);

  cards = cards.map((card) => {
    const plan = dictPlan[card.id];

    // ガード すでに未来に次回表示日時が設定されているものは処理不要
    if (!plan) {
      return card;
    }

    const limitShowTimeToday = new Date(
      onTime.getFullYear(),
      onTime.getMonth(),
      onTime.getDate(),
      plan.limitHour,
      plan.limitMinute
    );

    if (onTime.getTime() > limitShowTimeToday.getTime()) {
      // 本日現在を仮定して、既に表示終了時刻が過ぎているなら、翌日以降になる
      const nextShowTime = planNextShowTime(plan, false);
      const nextShowTimeS = nextShowTime ? nextShowTime.toString() : '';

      resetNotification(card, plan, dictContent[card.id], nextShowTime);
      Object.assign(card, { nextShowTime: nextShowTimeS });
    } else if (
      endOfYesterday.getTime() >= new Date(card.nextShowTime).getTime()
    ) {
      // 本日も表示する可能性があるもの。本日以降になる
      const nextShowTime = planNextShowTime(plan, true);
      const nextShowTimeS = nextShowTime ? nextShowTime.toString() : '';

      resetNotification(card, plan, dictContent[card.id], nextShowTime);
      Object.assign(card, { nextShowTime: nextShowTimeS });
    }

    return card;
  });
  await AsyncStorage.setItem('@cards', JSON.stringify(cards));

  return 'ok';
};

const getWaitingCardsOnTime = async () => {
  const cards = await getCards();

  return filterNextShowTimePast(cards, new Date());
};

const filterNextShowTimePast = (cards: Card[], date: Date) => {
  return cards.filter((card) => {
    return date.getTime() >= new Date(card.nextShowTime).getTime();
  });
};

const buildDict = async <T>(keys: string[]) => {
  const responses = await AsyncStorage.multiGet(keys);

  return responses.reduce((dict: Record<string, T>, response) => {
    const [_key, jsonValue] = response;
    const attrs = JSON.parse(jsonValue || '{}');

    return Object.assign(dict, { [attrs.cardId]: attrs });
  }, {});
};

export const createCard = async (attrs: any) => {
  const cardId: string = UUID.generate();
  const contentKey: string = getContentStoreKey(cardId);
  const planKey: string = getPlanStoreKey(cardId);

  const cardContent: CardContent = {
    cardId,
    title: attrs.title,
    body: attrs.body,
    attachment: attrs.attachment,
    attachmentLabel: attrs.attachmentLabel,
    attachmentBody: attrs.attachmentBody,
  };

  const cardPlan: CardPlan = {
    cardId,
    daily: attrs.daily,
    useDays: attrs.useDays,
    days: attrs.days,
    useDates: attrs.useDates,
    dates: attrs.dates,
    startHour: attrs.startHour,
    startMinute: attrs.startMinute,
    limitHour: attrs.limitHour,
    limitMinute: attrs.limitMinute,
    reborn: attrs.reborn,
    intervalMin: attrs.intervalMin,
    notification: attrs.notification,
  };

  const nextShowTime = planNextShowTime(cardPlan, true);
  const card: Card = {
    id: cardId,
    nextShowTime: nextShowTime ? nextShowTime.toString() : '',
  };

  // update @cards
  const cards: Card[] = await getCards();
  cards.push(card);

  Promise.all([
    AsyncStorage.setItem('@cards', JSON.stringify(cards)),
    // new @cardContent
    AsyncStorage.setItem(contentKey, JSON.stringify(cardContent)),
    // new @cardPlan
    AsyncStorage.setItem(planKey, JSON.stringify(cardPlan)),
  ]);

  // new Notification
  if (cardPlan.notification) {
    await setNotification(
      cardContent.title,
      cardContent.body,
      cardId,
      nextShowTime
    );
  }

  return { card, cardContent, cardPlan };
};

export const updateCard = async (cardId: string, attrs: any) => {
  const contentKey: string = getContentStoreKey(cardId);
  const planKey: string = getPlanStoreKey(cardId);

  const cardContent: CardContent = {
    cardId,
    title: attrs.title,
    body: attrs.body,
    attachment: attrs.attachment,
    attachmentLabel: attrs.attachmentLabel,
    attachmentBody: attrs.attachmentBody,
  };

  const cardPlan: CardPlan = {
    cardId,
    daily: attrs.daily,
    useDays: attrs.useDays,
    days: attrs.days,
    useDates: attrs.useDates,
    dates: attrs.dates,
    startHour: attrs.startHour,
    startMinute: attrs.startMinute,
    limitHour: attrs.limitHour,
    limitMinute: attrs.limitMinute,
    reborn: attrs.reborn,
    intervalMin: attrs.intervalMin,
    notification: attrs.notification,
  };

  const nextShowTime = planNextShowTime(cardPlan, true);
  const nextShowTimeS = nextShowTime ? nextShowTime.toString() : '';

  // update @cards
  let cards: Card[] = await getCards();
  cards = cards.map((card) => {
    if (card.id == cardId) {
      Object.assign(card, { nextShowTime: nextShowTimeS });
    }

    return card;
  });
  AsyncStorage.setItem('@cards', JSON.stringify(cards));

  // update @cardReborns
  await removeCardRebornByCardId(cardId);

  // update @cardContent
  await AsyncStorage.mergeItem(contentKey, JSON.stringify(cardContent));

  // update @cardPlan
  // AsyncStorage.mergeItemは配列要素でうまくいかず、setItemで対応（そのために一度削除実施）
  const currentCardPlan = (await getStorageItem(planKey)) || {};

  if (currentCardPlan) {
    await AsyncStorage.removeItem(planKey);
  }
  await AsyncStorage.setItem(
    planKey,
    JSON.stringify(Object.assign(currentCardPlan, cardPlan))
  );

  // update Notification
  await removeNotifications(cardId);
  if (cardPlan.notification) {
    await setNotification(
      cardContent.title,
      cardContent.body,
      cardId,
      nextShowTime
    );
  }

  return { cardId, cardContent, cardPlan };
};

const resetNotification = async (card: Card, plan: CardPlan, content: CardContent, nextShowTime: Date | null) => {
  if (plan.notification) {
    await removeNotifications(card.id);
    await setNotification(content.title, content.body, card.id, nextShowTime);
  }
};

const setNotification = async (
  title: string,
  body: string,
  cardId: string,
  nextShowTime: Date | null
) => {
  if (!nextShowTime) {
    return;
  }

  await createNotification({
    content: {
      title,
      body,
      data: { cardId },
    },
    trigger: nextShowTime.getTime(),
  });
};

export const updateNextShowTime = async (card: Card) => {
  const planKey = getPlanStoreKey(card.id);
  const cardPlan = (await getStorageItem(planKey)) || {};
  const nextShowTime = planNextShowTime(cardPlan, false);
  const nextShowTimeS = nextShowTime ? nextShowTime.toString() : '';

  let cards: Card[] = await getCards();
  cards = cards.map((c) => {
    if (c.id == card.id) {
      Object.assign(c, { nextShowTime: nextShowTimeS });
    }

    return c;
  });
  await AsyncStorage.setItem('@cards', JSON.stringify(cards));

  if (cardPlan.notification) {
    const contentKey = getContentStoreKey(card.id);
    const cardContent = (await getStorageItem(contentKey)) || {};

    await removeNotifications(card.id);
    await setNotification(
      cardContent.title,
      cardContent.body,
      card.id,
      nextShowTime
    );
  }
};

export const deleteCard = async (cardId: string) => {
  const contentKey: string = getContentStoreKey(cardId);
  const planKey: string = getPlanStoreKey(cardId);

  let cards: Card[] = await getCards();
  cards = cards.filter((h) => h.id != cardId);

  Promise.all([
    AsyncStorage.setItem('@cards', JSON.stringify(cards)),
    removeCardRebornByCardId(cardId),
    AsyncStorage.removeItem(contentKey),
    AsyncStorage.removeItem(planKey),
    removeNotifications(cardId),
  ]);
};

const planNextShowTime = (plan: CardPlan, includeToday = true): Date | null => {
  // 次回表示時間を決定する
  // - includeToday: true => カード自体の初期化や更新時
  // - includeToday: false => 運用中の次回を決める
  //
  // 1. 日付を決める
  // 2. 時間を決める
  // 3. 日付が本日で終了時間も過ぎている => includeToday: false で再実行
  //
  const nextDate = decidePlanDate(plan, includeToday);
  if (!nextDate) {
    return null;
  }

  const nextShowTime = new Date(
    nextDate.getFullYear(),
    nextDate.getMonth(),
    nextDate.getDate(),
    plan.startHour,
    plan.startMinute
  );
  const isToday = getIsToday(nextShowTime);

  if (isToday) {
    const nowDate = getToday();
    const limitTime = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth(),
      nowDate.getDate(),
      plan.limitHour,
      plan.limitMinute
    );
    if (nowDate > limitTime && includeToday) {
      // 本日を除外して再決定する
      return planNextShowTime(plan, false);
    }
  }

  return nextShowTime;
};

const decidePlanDate = (plan: CardPlan, includeToday: boolean): Date => {
  const today = getToday();
  const tomorrow = addDate(today, 1);

  // 毎日が設定されている
  if (plan.daily) {
    return includeToday ? today : tomorrow;
  }
  // 曜日と日付それぞれから決まる日付の早い方
  const baseDate = includeToday ? today : tomorrow;
  const dateByDays = decidePlanDateByDays(baseDate, plan?.days || []);
  const dateByDates = decidePlanDateByDates(baseDate, plan?.dates || []);

  return [...dateByDays, ...dateByDates].sort(
    (a, b) => a.getTime() - b.getTime()
  )[0];
};

const decidePlanDateByDays = (
  baseDate: Date,
  days: number[]
): Date[] => {
  return days.map((day) => getNextDayDate(baseDate, day));
};

const decidePlanDateByDates = (
  baseDate: Date,
  dates: number[]
): Date[] => {
  return dates.map((date) => getNextDateDate(baseDate, date));
};

const getStorageItem = async (key: string) => {
  const jsonValue = await AsyncStorage.getItem(key);

  return jsonValue ? JSON.parse(jsonValue) : null;
};

export const initCards = async () => {
  // 初期化用
  const keys = await AsyncStorage.getAllKeys();

  // 全削除
  await Promise.all(
    keys
      .filter((key) => {
        return (
          key.match(/cards/) ||
          key.match(/cardContent/) ||
          key.match(/cardPlan/) ||
          key.match(/cardReborns/)
        );
      })
      .map(async (key) => { await AsyncStorage.removeItem(key); })
  );

  // 初期データ投入
  await createCard({
    title: 'ワーク',
    body: '進捗どうですか？',
    daily: false,
    useDays: true,
    days: ['1', '2', '3', '4', '5'],
    useDates: false,
    dates: [],
    startHour: 10,
    startMinute: 0,
    limitHour: 16,
    limitMinute: 0,
    reborn: true,
    intervalMin: 30,
    notification: true,
  });

  await createCard({
    title: '学び',
    body: '今日最も印象に残ったことは何ですか？',
    daily: true,
    useDays: false,
    days: [],
    useDates: false,
    dates: [],
    startHour: 23,
    startMinute: 0,
    limitHour: 23,
    limitMinute: 55,
    reborn: false,
    intervalMin: 60,
    notification: true,
  });

  await createCard({
    title: '買い物',
    body: '期限が切れが近いポイントはありませんか？',
    daily: false,
    useDays: false,
    days: [],
    useDates: true,
    dates: ['5', '10', '15', '20', '25'],
    startHour: 20,
    startMinute: 0,
    limitHour: 23,
    limitMinute: 55,
    reborn: false,
    intervalMin: 60,
    notification: false,
  });

  await createCard({
    title: '月次チェック',
    body: '使っていないサブスクはありませんか？',
    daily: false,
    useDays: false,
    days: [],
    useDates: true,
    dates: ['15'],
    startHour: 10,
    startMinute: 0,
    limitHour: 23,
    limitMinute: 55,
    reborn: false,
    intervalMin: 60,
    notification: true,
  });
};
