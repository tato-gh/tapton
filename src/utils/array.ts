export const randomPick = <T>(list: T[], amount = 1): T[] =>
  list
    .map((val) => ({ val, rand: Math.random() }))
    .sort((a, b) => a.rand - b.rand)
    .map(({ val }) => val)
    .slice(0, amount);

export const buildItems = <T>(
  list: T[],
  initValue = 1
): Array<{ label: string; value: number }> => {
  return list.map((v, ind) => {
    return { label: `${v}`, value: initValue + ind };
  });
};

export const buildItemsSelf = (
  list: number[]
): Array<{ label: string; value: number }> => {
  return list.map((v) => {
    return { label: `${v}`, value: v };
  });
};

export const daysToS = (days: string[]) => {
  return daysNumToS(days.map((v) => parseInt(v)));
};

export const daysNumToS = (days: number[]) => {
  const list = ['日', '月', '火', '水', '木', '金', '土', '日'];

  return days.map((v) => list[v] || '');
};

export const sortByNumber = (values: string[]) => {
  return values.sort((a, b) => {
    const av = parseInt(a);
    const bv = parseInt(b);

    if (av > bv) {
      return 1;
    }
    if (av < bv) {
      return -1;
    }

    return 0;
  });
};
