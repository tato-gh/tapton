import type { Card } from './../types/card';

const getCards = () => {
  const cards: Card[] = [
    {title: 'カード1', content: 'Hello world'},
    {title: 'カード2', content: 'Hello world'},
    {title: 'カード3', content: 'Hello world'},
    {title: 'カード4', content: 'Hello world'},
    {title: 'カード5', content: 'Hello world'},
    {title: 'カード6', content: 'Hello world'},
    {title: 'カード7', content: 'Hello world'},
    {title: 'カード8', content: 'Hello world, Hello wrld, Hello world'},
    {title: 'カード9', content: 'Hello world'},
    {title: 'カード10', content: 'Hello world'}
  ];

  return cards;
};

export default getCards;
