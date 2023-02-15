import AsyncStorage from '@react-native-async-storage/async-storage';

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
  { card_id: '1', title: 'カード1', body: 'Hello world 1' },
  { card_id: '2', title: 'カード2', body: 'Hello world 2' },
  { card_id: '3', title: 'カード3', body: 'Hello world 3' },
  { card_id: '4', title: 'カード4', body: 'Hello world 4' }
];

const plans: CardPlan[] = [
  { card_id: '1', daily: true, startHour: 0, startMinute: 20, limitHour: 22, limitMinute: 30 },
  { card_id: '2', daily: true, startHour: 1, startMinute: 30, limitHour: 23, limitMinute: 30 },
  { card_id: '3', daily: true, startHour: 2, startMinute: 40, limitHour: 5, limitMinute: 30 },
  { card_id: '4', daily: true, startHour: 3, startMinute: 50, limitHour: 6, limitMinute: 30 },
];

export const getCards = async () => {
  try {
    // const jsonValue = await AsyncStorage.getItem('@cards');
    // return (jsonValue) ? JSON.parse(jsonValue) : null;

    return cards;
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
    const dictContent: {[parameter: string]: CardContent} = contents.reduce((acc, c) => Object.assign(acc, { [c.card_id]: c }), {});
    const dictPlan: {[parameter: string]: CardPlan} = plans.reduce((acc, c) => Object.assign(acc, { [c.card_id]: c }), {});

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
}

export const createCard = async (attrs) => {
  try {
    // TODO cards 更新
    // TODO card_content_*/card_plan_* 作成
    // const jsonValue = await AsyncStorage.getItem('@cards');
    // return (jsonValue) ? JSON.parse(jsonValue) : null;
    return null;
  } catch(e) {
    // error reading value
    return null;
  }
};
