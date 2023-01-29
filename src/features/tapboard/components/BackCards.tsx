import type { FC } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import IconButton from '@molecules/IconButton';
import CircleButton from '@molecules/CircleButton';

import BackCard from './BackCard';
import { randTop, randLeft, randRotate } from '../utils/position';
import { randomPick } from '@utils/array';

const bottomSize = 40;
const cardWidth = 200;
// maxTop: フットのメニューと被らないこと。カード回転（ただし直角にはならない）も考慮してcardWidthを引いている
const maxTop = Dimensions.get('window').height - bottomSize - 0.9 * cardWidth;
const maxLeft = Dimensions.get('window').width - cardWidth;

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
    {lead: 'カード8', body: 'Hello world, Hello wrld, Hello world'},
    {lead: 'カード9', body: 'Hello world'},
    {lead: 'カード10', body: 'Hello world'}
  ];
  const numCards = cards.length;
  const backCards = randomPick(cards, numCards);

  return (
    <>
      {backCards.map((card, ind) => {
        return (
          <View
            key={ind}
            style={{ position: 'absolute', top: randTop(maxTop), left: randLeft(maxLeft), transform: [{rotate: randRotate()}], zIndex: numCards - ind }}
          >
            <BackCard
              key={ind}
              lead={card.lead}
              body={card.body}
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
