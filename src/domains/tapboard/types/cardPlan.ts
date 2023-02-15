export type CardPlan = {
  card_id: string,
  daily: boolean,
  useDates?: boolean,
  dates?: Array<number>,
  useDays?: boolean,
  days?: Array<number>,
  startHour: number,
  startMinute: number,
  limitHour: number,
  limitMinute: number,
  reborn?: boolean,
  intervalMin?: number,
  notification?: boolean
};

export const isCardPlan = (arg: unknown): arg is CardPlan => {
  const c = arg as CardPlan;

  return (
    typeof c?.daily === 'boolean' &&
      typeof c?.startHour === 'number' &&
      typeof c?.startMinute === 'number' &&
      typeof c?.limitHour === 'number' &&
      typeof c?.limitMinute === 'number'
  )
};

export const isCardPlans = (arg: unknown[]): arg is CardPlan[] =>{
  return !arg.some((arg) => !isCardPlan(arg));
};
