export const randomPick = <T>(list: T[], amount = 1): T[] =>
  list
    .map((val) => ({ val, rand: Math.random() }))
    .sort((a, b) => a.rand - b.rand)
    .map(({ val }) => val)
    .slice(0, amount);

export const buildItems = (list: Array<number>): any => {
  return list.map((v) => { return { label: `${v}`, value: v } });
};
