import type { FC } from 'react';
import { Box, ScrollView, Text, Badge, Spacer, Heading, FlatList, HStack, VStack } from 'native-base';

import type { CardFull } from '@domains/tapboard/types/card';
import IconFlat from '@molecules/IconFlat';
import { daysToS, sortByNumber } from '@utils/array';
import { cutSec } from '@utils/date';

type Props = {
  cards: CardFull[],
  onNew: Function,
  onEdit: Function,
  onDelete: Function
};

const CardList: FC<Props> = ({ cards, onNew, onEdit, onDelete }) => {
  return (
    <ScrollView>
      <HStack mx='4' mt='6' mb='4' alignItems='center'>
        <Heading fontSize='md' fontWeight='bold'>
          カード一覧
        </Heading>
        <Spacer />
        <IconFlat theme='tertiary' icon='add' size={8} onPress={onNew} />
      </HStack>
      <FlatList
        data={cards}
        mx='4'
        renderItem={({ item }) =>
          <Box borderBottomWidth='1' borderColor='muted.300' pb='2' mb='2'>
            <HStack justifyContent='space-between'>
              <VStack space={2}>
                <Text fontSize='xs' color='coolGray.800' bold mt='2'>
                  {item.title}
                </Text>
                <Text fontSize='md' color='coolGray.600'>
                  {item.body}
                </Text>
                <HStack>
                  {item.daily && (
                    <Badge colorScheme='coolGray' variant='subtle'>毎日</Badge>
                  )}
                  {!item.daily && item.useDays && (
                    <Badge colorScheme='coolGray'>{daysToS(item.days).join('')}</Badge>
                  )}
                  {!item.daily && item.useDates && (
                    <Badge colorScheme='coolGray'>{sortByNumber(item.dates).join()}</Badge>
                  )}
                  {item.nextShowTime && (
                    <Badge colorScheme='coolGray'>{`次回:${cutSec(item.nextShowTime)}`}</Badge>
                  )}
                </HStack>
              </VStack>
              <HStack space={2}>
                <IconFlat theme='tertiary' icon='edit' size={6} onPress={() => onEdit(item.id)} />
                <IconFlat theme='warning' icon='delete' size={6} onPress={() => onDelete(item.id)} />
              </HStack>
            </HStack>
          </Box>}
        keyExtractor={ item => item.id }
      />
    </ScrollView>
  )
};

export default CardList;
