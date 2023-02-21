import type { Card } from '@domains/tapboard/types/card';
import type { CardContent } from '@domains/tapboard/types/cardContent';
import type { CardPlan } from '@domains/tapboard/types/cardPlan';

export type QueueCard = (Card & CardContent & CardPlan) & ({
  no: number,
  reborned: boolean
});
