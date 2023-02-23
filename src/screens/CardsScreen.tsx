import type { FC } from 'react';
import Cards from '@templates/Cards';

const CardsScreen: FC = ({ route }: any) => {
  return (<Cards key={route.params?.refreshKey} />);
};

export default CardsScreen;
