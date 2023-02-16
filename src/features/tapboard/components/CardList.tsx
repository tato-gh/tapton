import type { FC } from 'react';
import { Box, ScrollView, Text, Spacer, Heading, FlatList, HStack, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import type { Card } from '@domains/tapboard/types/card';
import IconFlat from '@molecules/IconFlat';

type Props = {
  cards: Card[],
};

const CardList: FC<Props> = ({ cards }) => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <HStack mx='4' mt='8' mb='4' alignItems='center'>
        <Heading fontSize='md' fontWeight='bold'>
          カード一覧
        </Heading>
        <Spacer />
        <IconFlat theme='tertiary' icon='add' size={8} onPress={() => { navigation.navigate('NewCard', {}) }} />
      </HStack>
      <FlatList
        data={cards}
        mx='4'
        renderItem={({ item }) =>
          <Box borderBottomWidth='1' borderColor='muted.300' pb='2' mb='2'>
            <HStack justifyContent='space-between'>
              <VStack>
                <Text fontSize='xs' color='coolGray.800' bold>
                  {item.title}
                </Text>
                <Text fontSize='md' color='coolGray.600'>
                  {item.body}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize='xs' color='coolGray.800' alignSelf='flex-start'>
                menu
              </Text>
            </HStack>
          </Box>}
        keyExtractor={ item => item.id }
      />
    </ScrollView>
  )
};

export default CardList;
