export const randomPick = <T>(list: T[], amount = 1): T[] =>
  list
    .map((val) => ({ val, rand: Math.random() }))
    .sort((a, b) => a.rand - b.rand)
    .map(({ val }) => val)
    .slice(0, amount);

export const buildItems = <T>(list: Array<T>, initValue = 1): Array<{ label: string, value: number }> => {
  return list.map((v, ind) => { return { label: `${v}`, value: initValue + ind } });
};

export const daysToS = (days: Array<string>) => {
  return daysNumToS(days.map(v => parseInt(v)));
};

export const daysNumToS = (days: Array<number>) => {
  const list = ['日', '月', '火', '水', '木', '金', '土', '日'];

  return days.map(v => (list[v] || ''));
};

export const sortByNumber = (values: Array<string>) => {
  return (
    values
    .sort((a, b) => {
      const av = parseInt(a);
      const bv = parseInt(b);

      if(av > bv) { return 1; }
      if(av < bv) { return -1; }
      return 0;
    })
  );
};
