export type Card = {
  id: number,
};

export const isCard = (arg: unknown): arg is Card => {
  const c = arg as Card;

  return (
    typeof c?.id === 'number'
  )
};

export const isCards = (arg: unknown[]): arg is Card[] =>{
  return !arg.some((arg) => !isCard(arg));
};
