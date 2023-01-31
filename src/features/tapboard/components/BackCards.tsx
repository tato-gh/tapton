import type { FC } from 'react';
import { Dimensions } from 'react-native';

import BackCard from './BackCard';
import { randomPick } from '@utils/array';
import { getPosition } from '../utils/position';
import getCards from '@domains/tapboard/sql/getCards';
import { OPE_BOTTOM_POSITION, CARD_WIDTH } from '../constants';

// maxTop: フットのメニューと被らないこと。カード回転（ただし直角にはならない）も考慮してcardWidthを引いている
const maxHeight = Dimensions.get('window').height - OPE_BOTTOM_POSITION - 0.9 * CARD_WIDTH;
const maxWidth = Dimensions.get('window').width - CARD_WIDTH;

const BackCards: FC = () => {
  // tmp data
  const cards = getCards();
  const numCards = cards.length;
  const backCards = randomPick(cards, numCards);

  return (
    <>
      {backCards.map((card, ind) => {
        const position = getPosition(maxHeight, maxWidth);

        return (
          <BackCard
            key={ind}
            title={card.title}
            content={card.content}
            position={position}
            zIndex={numCards - ind}
            focus={ind == 0 ? true : false}
          />
        );
      })}
    </>
  )
};

export default BackCards;
