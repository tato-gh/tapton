import type { FC } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import CircleButton from '@molecules/CircleButton';

import BackCard from './BackCard';
import { getPosition } from '../utils/position';
import { randomPick } from '@utils/array';
import getCards from '@domains/tapboard/sql/getCards';

const bottomSize = 40;
const cardWidth = 200;
// maxTop: フットのメニューと被らないこと。カード回転（ただし直角にはならない）も考慮してcardWidthを引いている
const maxHeight = Dimensions.get('window').height - bottomSize - 0.9 * cardWidth;
const maxWidth = Dimensions.get('window').width - cardWidth;

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
          <View
            key={ind}
            style={{ position: 'absolute', top: position.top, left: position.left, transform: [{rotate: `${position.rotate}deg`}], zIndex: numCards - ind }}
          >
            <BackCard
              key={ind}
              title={card.title}
              content={card.content}
              focus={ind == 0 ? true : false}
            />
          </View>
        );
      })}

      <View style={[styles.opeContainer, {zIndex: numCards + 1}]}>
        <View style={styles.opeRow}>
          <CircleButton theme='primary' icon='check' onPress={() => {}} />
        </View>
      </View>
    </>
  )
};

export default BackCards;

const styles = StyleSheet.create({
  opeContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: bottomSize,
  },
  opeRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
