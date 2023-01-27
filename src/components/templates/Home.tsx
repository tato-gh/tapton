import type { FC } from 'react';

import TapboardBackgroundImage from '@features/tapboard/components/organisms/BackgroundImage';
import TapboardBackCard from '@features/tapboard/components/atoms/BackCard';

const Home: FC = () => {
  return (
    <TapboardBackgroundImage>
      <TapboardBackCard top={40} left={40} />
    </TapboardBackgroundImage>
  );
};

export default Home;
