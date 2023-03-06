import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import 'react-native-url-polyfill/auto';

import * as yup from 'yup';
import type { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const CardFormSchema = yup.object({
  title: yup.string().required('必須項目です'),
  body: yup.string().required('必須項目です'),
  attachment: yup.string(),
  attachments: yup.array(),
  daily: yup.array(),
  useDays: yup.array(),
  days: yup.array(),
  useDates: yup.array(),
  dates: yup.array(),
  startHM: yup.array(),
  limitHM: yup.array(),
  reborn: yup.array(),
  intervalMin: yup.number(),
  notification: yup.array(),
});

type CardFormSchema = InferType<typeof CardFormSchema>;

const useCardFormer = () => {
  const { control, handleSubmit, watch, reset, formState, setValue } =
    useForm<CardFormSchema>({
      defaultValues: {
        title: '',
        body: '',
        attachment: 'none',
        attachments: ['', ''],
        daily: ['true'],
        useDays: [],
        days: [],
        useDates: [],
        dates: [],
        startHM: [0, 0],
        limitHM: [23, 55],
        reborn: [],
        intervalMin: 60,
        notification: [],
      },
      resolver: yupResolver(CardFormSchema),
    });

  const onSubmitBase: SubmitHandler<CardFormSchema> = (data: any) => {
    let aBody = data.attachments[1];
    if (data.attachment == 'youtube') {
      try {
        const url = new URL(aBody);
        console.log(url);
        aBody = url.searchParams.get('v') || url.pathname.slice(1);
      } catch {}
    }

    return {
      title: data.title,
      body: data.body,
      attachment: data.attachment,
      attachmentLabel: data.attachments[0],
      attachmentBody: aBody,
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
      notification: !!data.notification[0],
    };
  };

  return {
    control,
    handleSubmit,
    watch,
    reset,
    formState,
    setValue,
    onSubmitBase,
  };
};

export default useCardFormer;
