import type { FC } from 'react';

import TapboardBackgroundImage from '@features/tapboard/components/BackgroundImage';
// import TapboardBackCards from '@features/tapboard/components/BackCards';
import TapboardCheckListQueue from '@features/tapboard/components/CheckListQueue';

const Home: FC = () => {
  return (
    <TapboardBackgroundImage>
      <TapboardCheckListQueue />
    </TapboardBackgroundImage>
  );
};

export default Home;
