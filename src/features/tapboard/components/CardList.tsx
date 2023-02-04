import type { FC } from 'react';
import { Box, ScrollView, Text, Spacer, Heading, FlatList, HStack, VStack } from 'native-base';

import type { Card } from '@domains/tapboard/types/card';

type Props = {
  cards: Card[],
};

const CardList: FC<Props> = ({ cards }) => {

  return (
    <ScrollView>
      <Heading fontSize="md" fontWeight="bold" mx="4" mt="8" mb="4">
        カード一覧
      </Heading>
      <FlatList
        data={cards}
        mx="4"
        renderItem={({ item }) =>
          <Box borderBottomWidth="1" borderColor="muted.300" pb="2" mb="2">
            <HStack justifyContent="space-between">
              <VStack>
                <Text fontSize="xs" color="coolGray.800" bold>
                  {item.title}
                </Text>
                <Text fontSize="md" color="coolGray.600">
                  {item.content}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
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
