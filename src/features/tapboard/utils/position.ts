const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const randTop = (max: number): number => {
  return getRandomInt(max);
};

export const randLeft = (max: number): number => {
  return getRandomInt(max);
};

export const randRotate = (): string => {
  const value = getRandomInt(140) - 70;
  return `${value}deg`;
};
