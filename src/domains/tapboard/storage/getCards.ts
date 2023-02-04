import type { Card } from './../types/card';

const getCards = () => {
  const cards: Card[] = [
    {id: 1, title: 'カード1', content: 'Hello world', reborn: false},
    // {id: 2, title: 'カード2', content: 'Hello world', reborn: false},
    // {id: 3, title: 'カード3', content: 'Hello world', reborn: false},
    // {id: 4, title: 'カード4', content: 'Hello world', reborn: false},
    // {id: 5, title: 'カード5', content: 'Hello world', reborn: false},
    // {id: 6, title: 'カード6', content: 'Hello world', reborn: false},
    // {id: 7, title: 'カード7', content: 'Hello world', reborn: false},
    // {id: 8, title: 'カード8', content: 'Hello world, Hello wrld, Hello world', reborn: true, intervalMin: 1},
    // {id: 9, title: 'カード9', content: 'Hello world', reborn: false},
    // {id: 10, title: 'カード10', content: 'Hello world', reborn: false}
  ];

  return cards;
};

export default getCards;
