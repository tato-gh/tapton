import type { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Button, View, StyleSheet } from 'react-native';
import { Input, TextArea, Stack, VStack, FormControl } from 'native-base';

import HourMinuteSelect from '@molecules/HourMinuteSelect';

type Props = {
  control: any,
  handleSubmit: Function,
  errors: any,
  onSubmit: Function
}

const NewCardForm: FC<Props> = ({ control, handleSubmit, errors, onSubmit }) => {

  return (
    <View style={styles.formContainer}>
      <VStack w='100%' maxWidth='600px' p='12' space={2}>
        <FormControl isRequired isInvalid={errors.title} mb='2'>
          <Stack space={1}>
            <FormControl.Label>見出し</FormControl.Label>
            <FormControl.ErrorMessage>
              {errors.title?.message}
            </FormControl.ErrorMessage>
            <Controller
              control={control}
              render={({field: { onChange, value }}) => (
                <Input
                  p={2}
                  placeholder='見出し'
                  onChangeText={(val) => onChange(val)}
                  value={value}
                  backgroundColor={errors.title?.message ? 'error.300' : 'white'}
                />
              )}
              name='title'
            />
          </Stack>
        </FormControl>

        <FormControl isRequired isInvalid={errors.content} mb='2'>
          <Stack space={1}>
            <FormControl.Label>表示内容</FormControl.Label>
            <FormControl.ErrorMessage>
              {errors.content?.message}
            </FormControl.ErrorMessage>
            <Controller
              control={control}
              render={({field: { onChange, value }}) => (
                <TextArea
                  h={20}
                  p={2}
                  autoCompleteType={undefined}
                  placeholder='表示内容'
                  onChangeText={(val) => onChange(val)}
                  value={value}
                  backgroundColor={errors.content?.message ? 'error.300' : 'white'}
                />
              )}
              name='content'
            />
          </Stack>
        </FormControl>

        <FormControl mb='2'>
          <Stack space={1}>
            <FormControl.Label>表示開始時刻</FormControl.Label>
            <FormControl.ErrorMessage>
              {errors.startHM?.message}
            </FormControl.ErrorMessage>
            <Controller
              control={control}
              render={({field: { onChange, value }}) => (
                <HourMinuteSelect
                  value={value}
                  onValueChange={(val: any) => onChange(val)}
                />
              )}
              name='startHM'
            />
          </Stack>
        </FormControl>

        <FormControl mb='5'>
          <Stack space={1}>
            <FormControl.Label>表示終了時刻</FormControl.Label>
            <FormControl.ErrorMessage>
              {errors.limitHM?.message}
            </FormControl.ErrorMessage>
            <Controller
              control={control}
              render={({field: { onChange, value }}) => (
                <HourMinuteSelect
                  value={value}
                  onValueChange={(val: any) => onChange(val)}
                />
              )}
              name='limitHM'
            />
          </Stack>
        </FormControl>

        <Button
          title='新規作成'
          onPress={handleSubmit(onSubmit)}
        />
      </VStack>
    </View>
  );
};

export default NewCardForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
