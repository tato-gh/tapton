import type { FC } from 'react';
import { Button, HStack, VStack } from 'native-base';
import useCardForm from '../hooks/useCardForm';

type Props = {
  control: any,
  handleSubmit: Function,
  watch: Function,
  errors: any,
  onSubmit: Function,
  onCancel: Function
}

const EditCardForm: FC<Props> = ({ control, handleSubmit, watch, errors, onSubmit, onCancel }) => {
  const {
    watchUseDays,
    watchUseDates,
    watchReborn,
    TitleControl,
    BodyControl,
    ShowPlanControl,
    ShowTimeControl,
    RebornControl,
    NotificationControl
  } = useCardForm(watch);

  return (
    <VStack w='100%' maxWidth='600px' p='12' space={2}>
      <TitleControl control={control} errors={errors} />
      <BodyControl control={control} errors={errors} />
      <ShowPlanControl control={control} errors={errors} watchUseDays={watchUseDays} watchUseDates={watchUseDates} />
      <ShowTimeControl control={control} errors={errors} />
      <RebornControl control={control} watchReborn={watchReborn} />
      <NotificationControl control={control} />

      <HStack space={2}>
        <Button onPress={onCancel} colorScheme='secondary'>
          キャンセル
        </Button>
        <Button onPress={handleSubmit(onSubmit)} colorScheme='primary'>
          更新
        </Button>
      </HStack>
    </VStack>
  );
};

export default EditCardForm;
