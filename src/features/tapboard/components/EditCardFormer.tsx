import type { FC } from 'react';
import { useRef, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { UUID } from 'uuidjs';

import useCardFormer from '../hooks/useCardFormer';
import { getCardFullLoaded } from '@domains/tapboard/storage/cards';
import EditCardForm from './EditCardForm';
import { updateCard } from '@domains/tapboard/storage/cards';

type Props = {
  cardId: string
};

const EditCardFormer: FC<Props> = ({cardId}) => {
  const { control, handleSubmit, formState: { errors }, setValue, onSubmitBase } = useCardFormer();
  const navigation = useNavigation();
  const ref = useRef(null);

  useLayoutEffect(() => {
    (async () => {
      const card = await getCardFullLoaded(cardId);
      if(card) {
        setValue('title', card.title);
        setValue('body', card.body);
        setValue('daily', boolToCheckValues(card.daily));
        setValue('useDays', boolToCheckValues(card.useDays));
        setValue('days', card.days);
        setValue('useDates', boolToCheckValues(card.useDates));
        setValue('dates', card.dates);
        setValue('startHM', [card.startHour, card.startMinute]);
        setValue('limitHM', [card.limitHour, card.limitMinute]);
        setValue('reborn', boolToCheckValues(card.reborn));
        setValue('intervalMin', card.intervalMin);
        setValue('notification', boolToCheckValues(card.notification));
      }
    })();
  }, [cardId])

  const boolToCheckValues = (tf: boolean | undefined) => ( tf ? ['true'] : [] );

  const onSubmit: typeof onSubmitBase = async (data: any) => {
    const attrs = onSubmitBase(data);
    await updateCard(cardId, attrs);
    ref.current?.scrollTo({ y: 0 });
    navigation.navigate('Cards', {refreshKey: UUID.generate()})
  };

  const onCancel = () => {
    ref.current?.scrollTo({ y: 0 });
    navigation.navigate('Cards');
  };

  return (
    <ScrollView ref={ref}>
      <EditCardForm
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </ScrollView>
  )
};

export default EditCardFormer;
