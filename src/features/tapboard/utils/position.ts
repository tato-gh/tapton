type Position = {
  top: number,
  left: number,
  rotate: number
};

export const getPosition = (maxHeight: number, maxWidth: number): Position => {
  return {
    top: randTop(maxHeight),
    left: randTop(maxWidth),
    rotate: randRotate()
  }
};

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const randTop = (max: number): number => {
  return getRandomInt(max);
};

export const randLeft = (max: number): number => {
  return getRandomInt(max);
};

export const randRotate = (): number => {
  return getRandomInt(120) - 60;
};
