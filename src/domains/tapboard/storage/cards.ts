import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Card } from './../types/card';

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
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
];

const contents: {[parameter: number]: any} = {
  1: { title: 'カード1', content: 'Hello world 1' },
  2: { title: 'カード2', content: 'Hello world 2' },
  3: { title: 'カード3', content: 'Hello world 3' },
  4: { title: 'カード4', content: 'Hello world 4' }
};

const plans: {[parameter: number]: any} = {
  1: { reborn: false },
  2: { reborn: false },
  3: { reborn: false },
  4: { reborn: false }
};

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
    const cardsFull = cards.map((card) => {
      const content = contents[card.id];
      const plan = plans[card.id];
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
