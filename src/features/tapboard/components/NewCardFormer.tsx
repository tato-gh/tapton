import type { FC } from 'react';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { UUID } from 'uuidjs';

import useCardFormer from '../hooks/useCardFormer';
import NewCardForm from './NewCardForm';
import { createCard } from '@domains/tapboard/storage/cards';

const NewCardFormer: FC = () => {
  const { control, handleSubmit, watch, reset, formState: { errors }, onSubmitBase } = useCardFormer();
  const navigation = useNavigation();
  const ref = useRef(null);

  const onSubmit: typeof onSubmitBase = async (data: any) => {
    const attrs = onSubmitBase(data);
    await createCard(attrs);
    reset();
    ref.current?.scrollTo({ y: 0 })
    navigation.navigate('Cards', {refreshKey: UUID.generate()})
  };

  const onCancel = () => {
    reset();
    ref.current?.scrollTo({ y: 0 })
    navigation.navigate('Cards', {})
  };

  return (
    <ScrollView ref={ref}>
      <NewCardForm
        control={control}
        handleSubmit={handleSubmit}
        watch={watch}
        errors={errors}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </ScrollView>
  )
};

export default NewCardFormer;
