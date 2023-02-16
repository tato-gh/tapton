import AsyncStorage from '@react-native-async-storage/async-storage';
import { UUID } from "uuidjs";

import type { Card, CardFull } from './../types/card';
import type { CardContent } from './../types/cardContent';
import type { CardPlan } from './../types/cardPlan';
import { getCardContent, getStoreKey as getContentStoreKey } from './cardContents';
import { getCardPlan, getStoreKey as getPlanStoreKey } from './cardPlans';

export const getCard = async (cardId: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem('@cards');
    const cards: Card[] = (jsonValue) ? JSON.parse(jsonValue) : [];
    return cards.find((card) => card.id == cardId);
  } catch(e) {
    // error reading value
    return null;
  }
};

export const getCardFullLoaded = async (cardId: string) => {
  try {
    const card = await getCard(cardId);
    const content = await getCardContent(cardId);
    const plan = await getCardPlan(cardId);
    const cardFull: CardFull = Object.assign({}, card, content, plan);

    return cardFull;
  } catch(e) {
    // error reading value
    return null;
  }
};

export const getCards = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@cards');
    return (jsonValue) ? JSON.parse(jsonValue) : [];
  } catch(e) {
    // error reading value
    return [];
  }
};

export const getCardsFullLoaded = async () => {
  try {
    const cards: Card[] = await getCards();
    const [contentKeys, planKeys] = cards.reduce(
      (keys: Array<Array<string>>, card) => {
        const [cKeys, pKeys] = keys;
        const contentKey:string = getContentStoreKey(card.id);
        const planKey:string = getPlanStoreKey(card.id);
        return [[...cKeys, contentKey], [...pKeys, planKey]];
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
  } catch(e) {
    return [];
  }
}

const buildDict = async <T>(keys: Array<string>) => {
  try {
    const responses = await AsyncStorage.multiGet(keys);
    return responses.reduce(
      (dict: {[parameter: string]: T}, response) => {
        const [_key, jsonValue] = response;
        const attrs = JSON.parse(jsonValue || '{}');
        return Object.assign(dict, { [attrs.cardId]: attrs });
      },
      {}
    )
  } catch(e) {
    return {};
  }
};

export const createCard = async (attrs: any) => {
  const cardId:string = UUID.generate();
  const contentKey:string = getContentStoreKey(cardId);
  const planKey:string = getPlanStoreKey(cardId);
  // TODO
  const nextShowTime = '2023-02-15T12:30:30.002Z';

  try {
    const jsonValue = await AsyncStorage.getItem('@cards') || '';

    // update @cards
    let cards: Card[] = (jsonValue) ? JSON.parse(jsonValue) : [];
    const card: Card = {
      id: cardId,
      nextShowTime: nextShowTime
    };
    cards.push(card);
    AsyncStorage.setItem('@cards', JSON.stringify(cards));

    // new @cardContent
    const cardContent: CardContent = {
      cardId: cardId,
      title: attrs.title,
      body: attrs.body
    };
    AsyncStorage.setItem(contentKey, JSON.stringify(cardContent));

    // new @cardPlan
    const cardPlan: CardPlan = {
      cardId: cardId,
      daily: attrs.daily,
      useDates: attrs.useDates,
      dates: attrs.dates,
      useDays: attrs.useDays,
      days: attrs.days,
      startHour: attrs.startHour,
      startMinute: attrs.startMinute,
      limitHour: attrs.limitHour,
      limitMinute: attrs.limitMinute,
      reborn: attrs.reborn,
      intervalMin: attrs.intervalMin,
      notification: attrs.notification
    };
    AsyncStorage.setItem(planKey, JSON.stringify(cardPlan));

    return [card, cardContent, cardPlan];
  } catch(e) {
    // error reading value
    return null;
  }
};

export const updateCard = async (cardId: string, attrs: any) => {
  const contentKey:string = getContentStoreKey(cardId);
  const planKey:string = getPlanStoreKey(cardId);
  // TODO
  const nextShowTime = '2023-02-15T12:30:30.002Z';

  try {
    const jsonValue = await AsyncStorage.getItem('@cards') || '';

    // update @cards
    // TODO: ひょっとすると文字列変換でいける？
    // let cards: Card[] = (jsonValue) ? JSON.parse(jsonValue) : [];
    // const card: Card = {
    //   id: cardId,
    //   nextShowTime: nextShowTime
    // };
    // cards.push(card);
    // AsyncStorage.setItem('@cards', JSON.stringify(cards));

    // update @cardContent
    const cardContentAttrs = {
      title: attrs.title,
      body: attrs.body
    };
    AsyncStorage.mergeItem(contentKey, JSON.stringify(cardContentAttrs));

    // update @cardPlan
    const cardPlanAttrs = {
      daily: attrs.daily,
      useDates: attrs.useDates,
      dates: attrs.dates,
      useDays: attrs.useDays,
      days: attrs.days,
      startHour: attrs.startHour,
      startMinute: attrs.startMinute,
      limitHour: attrs.limitHour,
      limitMinute: attrs.limitMinute,
      reborn: attrs.reborn,
      intervalMin: attrs.intervalMin,
      notification: attrs.notification
    };
    AsyncStorage.mergeItem(planKey, JSON.stringify(cardPlanAttrs));

    return [];
  } catch(e) {
    // error reading value
    return null;
  }
};
