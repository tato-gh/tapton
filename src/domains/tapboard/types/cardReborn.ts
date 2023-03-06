export type CardReborn = {
  cardId: string;
  nextReshowTime: string;
  limitShowTime: string;
};

export const isCardReborn = (arg: unknown): arg is CardReborn => {
  const c = arg as CardReborn;

  return (
    typeof c?.cardId === 'string' &&
    typeof c?.nextReshowTime === 'string' &&
    typeof c?.limitShowTime === 'string'
  );
};

export const isCardReborns = (arg: unknown[]): arg is CardReborn[] => {
  return !arg.some((arg) => !isCardReborn(arg));
};
