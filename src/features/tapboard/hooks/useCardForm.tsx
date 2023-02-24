import type { FC } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { Input, TextArea, Text, Checkbox, Stack, HStack, VStack, FormControl } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';

import HourMinuteSelect from '@molecules/HourMinuteSelect';
import { buildItems, buildItemsSelf } from '@utils/array';

const useCardForm = () => {
  return {
    TitleControl,
    BodyControl,
    ShowPlanControl,
    ShowTimeControl,
    RebornControl,
    NotificationControl
  }
};

export default useCardForm;


type FormProps = {
  control: any,
  errors?: any
};

const TitleControl: FC<FormProps> = ({control, errors}) => {
  return (
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
  );
};

const BodyControl: FC<FormProps> = ({control, errors}) => {
  return (
    <FormControl isRequired isInvalid={errors.body} mb='2'>
      <Stack space={1}>
        <FormControl.Label>内容</FormControl.Label>
        <FormControl.ErrorMessage>
          {errors.body?.message}
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
              backgroundColor={errors.body?.message ? 'error.300' : 'white'}
            />
          )}
          name='body'
        />
      </Stack>
    </FormControl>
  );
};

const ShowPlanControl: FC<FormProps> = ({control}) => {
  const watchUseDays = useWatch({control, name: 'useDays'});
  const watchUseDates = useWatch({control, name: 'useDates'});

  return (
    <FormControl mb='2'>
      <Stack space={1}>
        <FormControl.Label>日付設定</FormControl.Label>
        <Controller
          control={control}
          render={({field: { onChange, value }}) => (
            <Checkbox.Group onChange={(val) => onChange(val)} value={value} accessibilityLabel="choose">
              <Checkbox size='sm' value={'true'}>毎日</Checkbox>
            </Checkbox.Group>
          )}
          name='daily'
        />

        <VStack space={2}>
          <Controller
            control={control}
            render={({field: { onChange, value }}) => (
              <Checkbox.Group onChange={(val) => onChange(val)} value={value} accessibilityLabel="choose">
                <Checkbox size='sm' value={'true'}>曜日で指定</Checkbox>
              </Checkbox.Group>
            )}
            name='useDays'
          />

          {watchUseDays[0] && (
            <View style={{marginLeft: 16, marginBottom: 8}}>
              <Controller
                control={control}
                render={({field: { onChange, value }}) => (
                  <Checkbox.Group onChange={(val) => onChange(val)} value={value} accessibilityLabel="choose">
                    <HStack space={3}>
                      {
                        buildItems<string>(['月', '火', '水', '木', '金'], 1).map(({label, value}) => (
                          <Checkbox key={`day-${value}`} size='sm' value={`${value}`}><Text fontSize='sm'>{label}</Text></Checkbox>
                        ))
                      }
                    </HStack>
                    <HStack space={3}>
                      {
                        buildItems<string>(['土', '日'], 6).map(({label, value}) => (
                          <Checkbox key={`day-${value}`} size='sm' value={`${value}`}><Text fontSize='sm'>{label}</Text></Checkbox>
                        ))
                      }
                    </HStack>
                  </Checkbox.Group>
                )}
                name='days'
              />
            </View>
          )}
        </VStack>

        <VStack space={2}>
          <Controller
            control={control}
            render={({field: { onChange, value }}) => (
              <Checkbox.Group onChange={(val) => onChange(val)} value={value} accessibilityLabel="choose">
                <Checkbox size='sm' value={'true'}>日付で指定</Checkbox>
              </Checkbox.Group>
            )}
            name='useDates'
          />

          {watchUseDates[0] && (
            <View style={{marginLeft: 16, marginBottom: 8}}>
              <Controller
                control={control}
                render={({field: { onChange, value }}) => (
                  <Checkbox.Group onChange={(val) => onChange(val)} value={value} accessibilityLabel="choose">
                    {
                      [1, 6, 11, 16, 21, 26].map((base) => {
                        const num = (base == 26 ? 6 : 5);
                        return (
                          <HStack key={`base-${base}`} space={3}>
                            {buildItems<number>([...Array(num).keys()], base).map(({value}) => {
                              return (
                                <Checkbox key={`date-${value}`} size='sm' value={`${value}`}><Text fontSize='sm'>{value}</Text></Checkbox>
                              )
                            })}
                          </HStack>
                        );
                      })
                    }
                  </Checkbox.Group>
                )}
                name='dates'
              />
            </View>
          )}
        </VStack>
      </Stack>
    </FormControl>
  );
};

const ShowTimeControl: FC<FormProps> = ({control}) => {
  return (
    <FormControl>
      <Stack space={1}>
        <FormControl.Label>表示開始時刻</FormControl.Label>
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

      <Stack space={1}>
        <FormControl.Label>表示終了時刻</FormControl.Label>
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
  );
};

const RebornControl: FC<FormProps> = ({control}) => {
  const watchReborn = useWatch({control, name: 'reborn'});

  return (
    <FormControl mb='2'>
      <Stack space={1}>
        <FormControl.Label>表示時間内での繰り返し表示</FormControl.Label>
        <VStack space={2}>
          <Controller
            control={control}
            render={({field: { onChange, value }}) => (
              <Checkbox.Group onChange={(val) => onChange(val)} value={value} accessibilityLabel="choose">
                <Checkbox size='sm' value={'true'}>有効</Checkbox>
              </Checkbox.Group>
            )}
            name='reborn'
          />

          {watchReborn[0] && (
            <HStack space={2} alignItems='center' marginLeft={4}>
              <Controller
                control={control}
                render={({field: { onChange, value }}) => (
                  <RNPickerSelect
                    onValueChange={(newValue) => {
                      if(newValue != value) {
                        onChange(value);
                      }
                    }}
                    items={buildItemsSelf([10, 20, 30, 40, 50, 60, 90, 120, 180, 240, 300, 360])}
                    value={`${value}`}
                    placeholder={{}}
                    useNativeAndroidPickerStyle={false}
                  />
                )}
                name='intervalMin'
              />
              <Text>分後に再表示</Text>
            </HStack>
          )}
        </VStack>
      </Stack>
    </FormControl>
  );
};

const NotificationControl: FC<FormProps> = ({control}) => {
  return (
    <FormControl mb='5'>
      <Stack space={1}>
        <FormControl.Label>通知</FormControl.Label>
        <VStack space={2}>
          <Controller
            control={control}
            render={({field: { onChange, value }}) => (
              <Checkbox.Group onChange={(val) => onChange(val)} value={value} accessibilityLabel="choose">
                <Checkbox size='sm' value={'true'}>有効</Checkbox>
              </Checkbox.Group>
            )}
            name='notification'
          />
        </VStack>
      </Stack>
    </FormControl>
  );
};

