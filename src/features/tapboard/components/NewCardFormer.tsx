import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form'

import NewCardForm from './NewCardForm';
// import { createCard } from '@domains/tapboard/storage/cards';
// import type { Card } from '@domains/tapboard/types/card';

interface FormData {
  title: string,
  content: string,
  // https://docs.expo.dev/versions/latest/sdk/date-time-picker/
  startTime: any,
  limitTime: any,
  daily: boolean,
  dates: number[],
  days: number[],
  reborn: boolean,
  intervalMin: number,
  notification: boolean
}

const NewCardFormer: FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: '',
      content: '',
      startTime: null,
      limitTime: null,
      daily: true,
      dates: [],
      days: [],
      reborn: false,
      intervalMin: 60,
      notification: false
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data: any) => console.log(data);

  return <NewCardForm
    control={control}
    handleSubmit={handleSubmit}
    errors={errors}
    onSubmit={onSubmit}
  />
};

export default NewCardFormer;
