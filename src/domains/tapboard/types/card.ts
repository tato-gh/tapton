export type Card = {
  title: string,
  content: string
};

export const isCard = (arg: unknown): arg is Card => {
  const c = arg as Card;

  return (
    typeof c?.title === 'string' &&
      typeof c?.content === 'string'
  )
};

export const isCards = (arg: unknown[]): arg is Card[] =>{
  return !arg.some((arg) => !isCard(arg));
};
