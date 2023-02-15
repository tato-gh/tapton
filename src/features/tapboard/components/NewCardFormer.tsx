import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form'
import * as yup from 'yup';
import type { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import NewCardForm from './NewCardForm';
// import { createCard } from '@domains/tapboard/storage/cards';
// import type { Card } from '@domains/tapboard/types/card';

const newCardFormSchema = yup.object({
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

type newCardFormSchema = InferType<typeof newCardFormSchema>;

const NewCardFormer: FC = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<newCardFormSchema>({
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
    resolver: yupResolver(newCardFormSchema)
  });

  const onSubmit: SubmitHandler<newCardFormSchema> = (data: any) => console.log(data);

  return <NewCardForm
    control={control}
    handleSubmit={handleSubmit}
    watch={watch}
    errors={errors}
    onSubmit={onSubmit}
  />
};

export default NewCardFormer;
