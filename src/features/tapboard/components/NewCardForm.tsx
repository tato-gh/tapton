import type { FC } from 'react';
import { Controller } from 'react-hook-form';
import {Button, Text, TextInput, View} from 'react-native';

type Props = {
  control: any,
  handleSubmit: Function,
  errors: any,
  onSubmit: Function
}

const NewCardForm: FC<Props> = ({ control, handleSubmit, errors, onSubmit }) => {
  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 0.2, alignItems: 'flex-end'}}>
          <Text>名前</Text>
        </View>
        <View style={{flex: 0.8}}>
          <Controller
            control={control}
            render={({field: { onChange, value }}) => (
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  width: '80%',
                  fontSize: 20,
                  margin: '4%',
                }}
                value={value}
                onChangeText={onChange}
                placeholder="○○太郎"
              />
            )}
            name="title"
            rules={{
              required: true,
              maxLength: 10,
            }}
          />
          {errors.title && errors.title.type === 'required' && (
            <Text style={{color: 'red'}}>Nameは必須です。</Text>
          )}
          {errors.title && errors.title.type === 'maxLength' && (
            <Text style={{color: 'red'}}>
              Nameは10文字以内で入力してください。
            </Text>
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 0.2, alignItems: 'flex-end'}}>
          <Text>郵便番号</Text>
        </View>
        <View style={{flex: 0.8}}>
          <Controller
            control={control}
            render={({field: { onChange, value }}) => (
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  width: '80%',
                  fontSize: 20,
                  margin: '4%',
                }}
                onChangeText={onChange}
                value={value}
                placeholder="000-0000"
              />
            )}
            name="content"
            rules={{
              pattern: /^\d{3}-\d{4}$/,
            }}
          />
          {errors.content && errors.content.type === 'pattern' && (
            <Text style={{color: 'red'}}>
              郵便番号のフォーマットが不正です。
            </Text>
          )}
        </View>
      </View>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default NewCardForm;
