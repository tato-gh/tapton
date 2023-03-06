import type { FC } from 'react';
import { Button, HStack, VStack } from 'native-base';
import useCardForm from '../hooks/useCardForm';

type Props = {
  control: any;
  handleSubmit: Function;
  errors: any;
  onSubmit: Function;
  onCancel: Function;
};

const EditCardForm: FC<Props> = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  onCancel,
}) => {
  const {
    TitleControl,
    BodyControl,
    AttachmentControl,
    ShowPlanControl,
    ShowTimeControl,
    RebornControl,
    NotificationControl,
  } = useCardForm();

  return (
    <VStack w="100%" maxWidth="600px" p="12" space={2}>
      <TitleControl control={control} errors={errors} />
      <BodyControl control={control} errors={errors} />
      <AttachmentControl control={control} errors={errors} />
      <ShowPlanControl control={control} errors={errors} />
      <ShowTimeControl control={control} errors={errors} />
      <RebornControl control={control} />
      <NotificationControl control={control} />

      <HStack space={2}>
        <Button onPress={onCancel} colorScheme="secondary">
          キャンセル
        </Button>
        <Button onPress={handleSubmit(onSubmit)} colorScheme="primary">
          更新
        </Button>
      </HStack>
    </VStack>
  );
};

export default EditCardForm;
