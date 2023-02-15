export type Card = {
  id: string,
  nextShowTime: string
};

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
