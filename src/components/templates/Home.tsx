import type { FC } from 'react';

import TapboardBackgroundImage from '@features/tapboard/components/BackgroundImage';
import TapboardBackCards from '@features/tapboard/components/BackCards';

const Home: FC = () => {
  return (
    <TapboardBackgroundImage>
      <TapboardBackCards />
    </TapboardBackgroundImage>
  );
};

export default Home;
