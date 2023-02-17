import type { FC } from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import type { SubmitHandler } from 'react-hook-form'
import * as yup from 'yup';
import type { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import NewCardForm from './NewCardForm';
import { createCard } from '@domains/tapboard/storage/cards';

const newCardFormSchema = yup.object({
  title: yup.string().required('必須項目です'),
  body: yup.string().required('必須項目です'),
  daily: yup.array(),
  useDays: yup.array(),
  days: yup.array(),
  useDates: yup.array(),
  dates: yup.array(),
  startHM: yup.array(),
  limitHM: yup.array(),
  reborn: yup.array(),
  intervalMin: yup.number(),
  notification: yup.array()
});

type newCardFormSchema = InferType<typeof newCardFormSchema>;

const NewCardFormer: FC = () => {
  const { control, handleSubmit, watch, reset, formState: { errors } } = useForm<newCardFormSchema>({
    defaultValues: {
      title: '',
      body: '',
      daily: ['true'],
      useDays: [],
      days: [],
      useDates: [],
      dates: [],
      startHM: [0, 0],
      limitHM: [23, 55],
      reborn: [],
      intervalMin: 60,
      notification: []
    },
    resolver: yupResolver(newCardFormSchema)
  });
  const navigation = useNavigation();
  const ref = useRef(null);

  const onSubmit: SubmitHandler<newCardFormSchema> = (data: any) => {
    createCard({
      title: data.title,
      body: data.body,
      daily: !!data.daily[0],
      useDays: !!data.useDays[0],
      days: [...new Set(data.days)].sort(),
      useDates: !!data.useDates[0],
      dates: [...new Set(data.dates)].sort(),
      startHour: data.startHM[0],
      startMinute: data.startHM[1],
      limitHour: data.limitHM[0],
      limitMinute: data.limitHM[1],
      reborn: !!data.reborn[0],
      intervalMin: data.intervalMin,
      notification: !!data.notification[0]
    });

    reset();
    ref.current?.scrollTo({ y: 0 })
    navigation.navigate('Cards', {});
  };

  const onCancel = () => {
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
