import type { FC } from 'react';

import BackCard from './BackCard';
import {randTop, randLeft, randRotate} from '../utils/position';

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

  return (
    <>
      {cards.map((card) => (
        <BackCard
          top={randTop(600)}
          left={randLeft(400)}
          rotate={randRotate()}
          lead={card.lead}
          body={card.body}
        />
      ))}
    </>
  )
};

export default BackCards;
