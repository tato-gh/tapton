export type CardContent = {
  card_id: string,
  title: string,
  body: string
};

export const isCardContent = (arg: unknown): arg is CardContent => {
  const c = arg as CardContent;

  return (
    typeof c?.title === 'string' &&
      typeof c?.body === 'string'
  )
};

export const isCardContents = (arg: unknown[]): arg is CardContent[] =>{
  return !arg.some((arg) => !isCardContent(arg));
};
