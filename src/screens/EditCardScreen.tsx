import type { FC } from 'react';
import EditCard from '@templates/EditCard';

const EditCardScreen: FC = ({ route }: any) => {
  return (<EditCard cardId={route.params.cardId} />);
};

export default EditCardScreen;
