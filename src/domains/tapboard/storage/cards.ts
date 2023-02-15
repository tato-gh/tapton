import AsyncStorage from '@react-native-async-storage/async-storage';
import { UUID } from "uuidjs";

import type { Card } from './../types/card';
import type { CardContent } from './../types/cardContent';
import type { CardPlan } from './../types/cardPlan';

export const storeCards = (cards: Card[]) => {
  try {
    const jsonValue = JSON.stringify(cards)
    AsyncStorage.setItem('@cards', jsonValue);
  } catch (e) {
    // saving error
  }
};


// tmp
const cards: Card[] = [
  { id: '1', nextShowTime: '2023-02-15T12:30:30.002Z' },
  { id: '2', nextShowTime: '2023-02-15T12:30:30.002Z' },
  { id: '3', nextShowTime: '2023-02-15T12:30:30.002Z' },
  { id: '4', nextShowTime: '2023-02-15T12:30:30.002Z' },
];

const contents: CardContent[] = [
  { cardId: '1', title: 'カード1', body: 'Hello world 1' },
  { cardId: '2', title: 'カード2', body: 'Hello world 2' },
  { cardId: '3', title: 'カード3', body: 'Hello world 3' },
  { cardId: '4', title: 'カード4', body: 'Hello world 4' }
];

const plans: CardPlan[] = [
  { cardId: '1', daily: true, startHour: 0, startMinute: 20, limitHour: 22, limitMinute: 30 },
  { cardId: '2', daily: true, startHour: 1, startMinute: 30, limitHour: 23, limitMinute: 30 },
  { cardId: '3', daily: true, startHour: 2, startMinute: 40, limitHour: 5, limitMinute: 30 },
  { cardId: '4', daily: true, startHour: 3, startMinute: 50, limitHour: 6, limitMinute: 30 },
];

const dictContent: {[parameter: string]: CardContent} = contents.reduce((acc, c) => Object.assign(acc, { [c.cardId]: c }), {});
const dictPlan: {[parameter: string]: CardPlan} = plans.reduce((acc, c) => Object.assign(acc, { [c.cardId]: c }), {});

export const getCards = async () => {
  try {
    // const jsonValue = await AsyncStorage.getItem('@cards');
    // return (jsonValue) ? JSON.parse(jsonValue) : null;

    // tmp
    const cardsFull = cards.map((card) => {
      const content = dictContent[card.id];
      const plan = dictPlan[card.id];
      return Object.assign({}, card, content, plan);
    });
    return cardsFull;
  } catch(e) {
    // error reading value
    return null;
  }
};

export const getCardsFullLoaded = async () => {
  try {
    // const jsonValue = await AsyncStorage.getItem('@cards');
    // return (jsonValue) ? JSON.parse(jsonValue) : null;
    // tmp
    const cardsFull = cards.map((card) => {
      const content = dictContent[card.id];
      const plan = dictPlan[card.id];
      return Object.assign({}, card, content, plan);
    });
    console.log(cardsFull);

    return cardsFull;
  } catch(e) {
    // error reading value
    return null;
  }
}

export const createCard = async (attrs: any) => {
  const cardId:string = UUID.generate();
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
    AsyncStorage.setItem(`@cardContent-${cardId}`, JSON.stringify(cardContent));

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
    AsyncStorage.setItem(`@cardPlan-${cardId}`, JSON.stringify(cardPlan));

    return [card, cardContent, cardPlan];
  } catch(e) {
    // error reading value
    return null;
  }
};
