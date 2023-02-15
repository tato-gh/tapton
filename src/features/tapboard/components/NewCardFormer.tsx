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
  content: yup.string().required('必須項目です'),
  daily: yup.array(),
  useDates: yup.array(),
  dates: yup.array(),
  useDays: yup.array(),
  days: yup.array(),
  // https://docs.expo.dev/versions/latest/sdk/date-time-picker/
  startHM: yup.array(),
  limitHM: yup.array(),
  reborn: yup.boolean(),
  intervalMin: yup.number(),
  notification: yup.boolean()
});

type newCardFormSchema = InferType<typeof newCardFormSchema>;

const NewCardFormer: FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<newCardFormSchema>({
    defaultValues: {
      title: '',
      content: '',
      daily: ['true'],
      useDates: [],
      dates: [],
      useDays: [],
      days: [],
      startHM: [0, 0],
      limitHM: [23, 55],
      reborn: false,
      intervalMin: 60,
      notification: false
    },
    resolver: yupResolver(newCardFormSchema)
  });

  const onSubmit: SubmitHandler<newCardFormSchema> = (data: any) => console.log(data);

  return <NewCardForm
    control={control}
    handleSubmit={handleSubmit}
    errors={errors}
    onSubmit={onSubmit}
  />
};

export default NewCardFormer;
