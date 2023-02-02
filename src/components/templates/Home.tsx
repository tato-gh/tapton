import type { FC } from 'react';

import TapboardBackgroundImager from '@features/tapboard/components/BackgroundImager';
import TapboardCheckListQueue from '@features/tapboard/components/CheckListQueue';

const Home: FC = () => {
  return (
    <TapboardBackgroundImager>
      <TapboardCheckListQueue />
    </TapboardBackgroundImager>
  );
};

export default Home;
