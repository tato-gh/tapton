import type { FC } from 'react';
import { Button, HStack, VStack } from 'native-base';
import useCardForm from '../hooks/useCardForm';

type Props = {
  control: any;
  handleSubmit: Function;
  watch: Function;
  errors: any;
  onSubmit: Function;
  onCancel: Function;
};

const NewCardForm: FC<Props> = ({
  control,
  handleSubmit,
  watch,
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
      <ShowTimeControl control={control} />
      <RebornControl control={control} />
      <NotificationControl control={control} />

      <HStack space={2}>
        <Button onPress={onCancel} colorScheme="secondary">
          キャンセル
        </Button>
        <Button onPress={handleSubmit(onSubmit)} colorScheme="primary">
          新規作成
        </Button>
      </HStack>
    </VStack>
  );
};

export default NewCardForm;
