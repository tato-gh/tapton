type Colors = {
  primary: { [key: string]: string }
};

export type ThemeName = keyof Colors;

const colors: Colors = {
  primary: {
    circle: 'primary.500',
    circleBackground: 'primary.50',
    icon: 'primary.500'
  }
};

export default colors;
