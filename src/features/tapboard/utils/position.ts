export type Position = {
  top: number;
  left: number;
  rotate: number;
};

export const getPosition = (
  maxHeight: number,
  maxWidth: number,
  central: boolean
): Position => {
  if (central) {
    return {
      top: maxHeight / 3,
      left: 0,
      rotate: 0,
    };
  } else {
    return {
      top: randTop(maxHeight),
      left: randTop(maxWidth),
      rotate: randRotate(),
    };
  }
};

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const randTop = (max: number): number => {
  // スマホだとヘッダーに被ると押しにくいため、-20後に+20
  return getRandomInt(max - 20) + 20;
};

export const randLeft = (max: number): number => {
  return getRandomInt(max);
};

export const randRotate = (): number => {
  return getRandomInt(120) - 60;
};
