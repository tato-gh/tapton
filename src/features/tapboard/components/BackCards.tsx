import type { FC } from 'react';
import { View } from 'react-native';

import BackCard from './BackCard';

type Props = {
  cards: []
}

const BackCards: FC<Props> = ({ cards = [] }) => {
  return (
    <>
      <BackCard top={40} left={20} rotate={-20} />
      <BackCard top={20} left={40} rotate={50} />
    </>
  )
};

export default BackCards;
