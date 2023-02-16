import type { FC } from 'react';
import { useRef, useState, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import type { SubmitHandler } from 'react-hook-form'
import * as yup from 'yup';
import type { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { getCardFullLoaded } from '@domains/tapboard/storage/cards';
import EditCardForm from './EditCardForm';
import { updateCard } from '@domains/tapboard/storage/cards';

const editCardFormSchema = yup.object({
  title: yup.string().required('必須項目です'),
  body: yup.string().required('必須項目です'),
  daily: yup.array(),
  useDates: yup.array(),
  dates: yup.array(),
  useDays: yup.array(),
  days: yup.array(),
  startHM: yup.array(),
  limitHM: yup.array(),
  reborn: yup.array(),
  intervalMin: yup.number(),
  notification: yup.array()
});

type editCardFormSchema = InferType<typeof editCardFormSchema>;

type Props = {
  cardId: string
};

const EditCardFormer: FC<Props> = ({cardId}) => {
  const { control, handleSubmit, watch, reset, formState: { errors }, setValue } = useForm<editCardFormSchema>({
    defaultValues: {
      title: '',
      body: '',
      daily: ['true'],
      useDates: [],
      dates: [],
      useDays: [],
      days: [],
      startHM: [0, 0],
      limitHM: [23, 55],
      reborn: [],
      intervalMin: 60,
      notification: []
    },
    resolver: yupResolver(editCardFormSchema)
  });
  const navigation = useNavigation();
  const ref = useRef(null);

  useLayoutEffect(() => {
    (async () => {
      const card = await getCardFullLoaded(cardId);
      console.log(card);
      if(card) {
        setValue('title', card.title);
        setValue('body', card.body);
        setValue('daily', boolToCheckValues(card.daily));
        setValue('useDates', boolToCheckValues(card.useDates));
        setValue('dates', card.dates);
        setValue('useDays', boolToCheckValues(card.useDays));
        setValue('days', card.days);
        setValue('startHM', [card.startHour, card.startMinute]);
        setValue('limitHM', [card.limitHour, card.limitMinute]);
        setValue('reborn', boolToCheckValues(card.reborn));
        setValue('intervalMin', card.intervalMin);
        setValue('notification', boolToCheckValues(card.notification));
      }
    })();
  }, [cardId])

  const boolToCheckValues = (tf: boolean | undefined) => ( tf ? ['true'] : [] );

  const onSubmit: SubmitHandler<editCardFormSchema> = (data: any) => {
    updateCard(cardId, {
      title: data.title,
      body: data.body,
      daily: !!data.daily[0],
      useDates: !!data.useDates[0],
      dates: data.dates,
      useDays: !!data.useDays[0],
      days: data.days,
      startHour: data.startHM[0],
      startMinute: data.startHM[1],
      limitHour: data.limitHM[0],
      limitMinute: data.limitHM[1],
      reborn: !!data.reborn[0],
      intervalMin: data.intervalMin,
      notification: !!data.notification[0]
    });

    ref.current?.scrollTo({ y: 0 })
    navigation.navigate('Cards', {});
  };

  const onCancel = () => {
    ref.current?.scrollTo({ y: 0 })
    navigation.navigate('Cards', {})
  };

  return (
    <ScrollView ref={ref}>
      <EditCardForm
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

export default EditCardFormer;
