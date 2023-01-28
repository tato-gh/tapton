import type { FC } from 'react';

import BackCard from './BackCard';
import { getRandomInt, randTop, randLeft, randRotate } from '../utils/position';
import { randomPick } from '@utils/array';

const BackCards: FC = () => {
  // tmp data
  const cards = [
    {lead: 'カード1', body: 'Hello world'},
    {lead: 'カード2', body: 'Hello world'},
    {lead: 'カード3', body: 'Hello world'},
    {lead: 'カード4', body: 'Hello world'},
    {lead: 'カード5', body: 'Hello world'},
    {lead: 'カード6', body: 'Hello world'},
    {lead: 'カード7', body: 'Hello world'},
    {lead: 'カード8', body: 'Hello world'},
    {lead: 'カード9', body: 'Hello world'},
    {lead: 'カード10', body: 'Hello world'}
  ];
  const numCards = cards.length;
  const backCards = randomPick(cards, numCards);

  return (
    <>
      {backCards.map((card, ind) => {
        return (
          <BackCard
            key={ind}
            lead={card.lead}
            body={card.body}
            top={randTop(600)}
            left={randLeft(400)}
            zIndex={numCards - ind}
            rotate={randRotate()}
            focus={ind == 0 ? true : false}
          />
        );
      })}
    </>
  )
};

export default BackCards;
