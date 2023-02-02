type Colors = {
  primary: { [key: string]: string },
  secondary: { [key: string]: string },
  tertiary: { [key: string]: string },
  muted: { [key: string]: string }
};

export type ThemeName = keyof Colors;

const colors: Colors = {
  primary: {
    circle: 'primary.500',
    circleBackground: 'primary.50',
    icon: 'primary.500',
    iconBackground: 'primary.50',
    iconLabel: 'primary.500',
  },
  secondary: {
    circle: 'secondary.500',
    circleBackground: 'secondary.50',
    icon: 'secondary.500',
    iconBackground: 'secondary.50',
    iconLabel: 'secondary.500',
  },
  tertiary: {
    circle: 'tertiary.500',
    circleBackground: 'tertiary.50',
    icon: 'tertiary.500',
    iconBackground: 'tertiary.50',
    iconLabel: 'tertiary.500',
  },
  muted: {
    circle: 'muted.500',
    circleBackground: 'muted.50',
    icon: 'muted.500',
    iconBackground: 'muted.50',
    iconLabel: 'muted.500',
  }
};

export default colors;
