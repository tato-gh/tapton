import type { FC } from 'react';
import Home from '@templates/Home';

const HomeScreen: FC = ({ route }: any) => {
  return <Home key={route.params?.refreshKey} />;
};

export default HomeScreen;
