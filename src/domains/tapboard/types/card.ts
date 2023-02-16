import type { CardContent } from './../types/cardContent';
import type { CardPlan } from './../types/cardPlan';

export type Card = {
  id: string,
  nextShowTime: string
};

export type CardFull = Card | CardContent | CardPlan;

export const isCard = (arg: unknown): arg is Card => {
  const c = arg as Card;

  return (
    typeof c?.id === 'string' &&
      typeof c?.nextShowTime === 'string'
  )
};

export const isCards = (arg: unknown[]): arg is Card[] =>{
  return !arg.some((arg) => !isCard(arg));
};
