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

export const getCards = async () => {
  try {
    // const jsonValue = await AsyncStorage.getItem('@cards');
    // return (jsonValue) ? JSON.parse(jsonValue) : null;

    const cards: Card[] = [
      {id: 1, title: 'カード1', content: 'Hello world', reborn: false},
      {id: 2, title: 'カード2', content: 'Hello world', reborn: false},
      {id: 3, title: 'カード3', content: 'Hello world', reborn: false},
      {id: 4, title: 'カード4', content: 'Hello world', reborn: false},
      {id: 5, title: 'カード5', content: 'Hello world', reborn: false},
      {id: 6, title: 'カード6', content: 'Hello world', reborn: false},
      {id: 7, title: 'カード7', content: 'Hello world', reborn: false},
      {id: 8, title: 'カード8', content: 'Hello world, Hello wrld, Hello world', reborn: true, intervalMin: 1},
      {id: 9, title: 'カード9', content: 'Hello world', reborn: false},
      {id: 10, title: 'カード10', content: 'Hello world', reborn: false}
    ];

    return cards;
  } catch(e) {
    // error reading value
    return null;
  }
};
