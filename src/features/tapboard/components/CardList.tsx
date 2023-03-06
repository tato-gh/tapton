import type { FC } from 'react';
import type { CardFull } from '@domains/tapboard/types/card';
import { daysToS, sortByNumber } from '@utils/array';
import {
  Box,
  Text,
  Badge,
  Button,
  Spacer,
  Heading,
  FlatList,
  HStack,
  VStack,
} from 'native-base';

import IconFlat from '@molecules/IconFlat';
import IconBadge from '@molecules/IconFlat';

type Props = {
  cards: CardFull[];
  onNew: Function;
  onEdit: Function;
  onDelete: Function;
  onInit: Function;
};

const CardList: FC<Props> = ({ cards, onNew, onEdit, onDelete, onInit }) => {
  return (
    <>
      <HStack mx="4" mt="6" mb="4" alignItems="center">
        <Heading fontSize="md" fontWeight="bold">
          カード一覧
        </Heading>
        <Spacer />
        <IconFlat theme="tertiary" icon="add" size={8} onPress={onNew} />
      </HStack>
      {cards.length == 0 && (
        <Box flex={1} alignItems="center" mt={6}>
          <Button onPress={onInit}>サンプルを試す</Button>
        </Box>
      )}
      <FlatList
        data={cards}
        mx="4"
        renderItem={({ item }) => (
          <Box borderBottomWidth="1" borderColor="muted.300" pb="2" mb="2">
            <HStack justifyContent="space-between">
              <VStack space={2} maxW="80%">
                <Text fontSize="xs" color="coolGray.800" bold mt="2">
                  {item.title}
                </Text>
                <Text fontSize="md" color="coolGray.600">
                  {item.body}
                </Text>
                <HStack>
                  {item.daily && (
                    <Badge colorScheme="coolGray" variant="subtle">
                      毎日
                    </Badge>
                  )}
                  {!item.daily && item.useDays && (
                    <Badge colorScheme="coolGray" variant="subtle">
                      {daysToS(item.days).join('')}
                    </Badge>
                  )}
                  {!item.daily && item.useDates && (
                    <Badge colorScheme="coolGray" variant="subtle">
                      {sortByNumber(item.dates).join()}
                    </Badge>
                  )}
                  {item.reborn && (
                    <Badge colorScheme="coolGray" variant="subtle">
                      <IconBadge theme="muted" icon="history" size={4} />
                    </Badge>
                  )}
                  {item.notification && (
                    <Badge colorScheme="coolGray" variant="subtle">
                      <IconBadge theme="muted" icon="alarm" size={4} />
                    </Badge>
                  )}
                </HStack>
              </VStack>
              <HStack space={2}>
                <IconFlat
                  theme="tertiary"
                  icon="edit"
                  size={6}
                  onPress={() => onEdit(item.id)}
                />
                <IconFlat
                  theme="warning"
                  icon="delete"
                  size={6}
                  onPress={() => onDelete(item.id)}
                />
              </HStack>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default CardList;
