
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { lightTheme } from './light';
import { darkTheme } from './dark';

export const theme = {
  colors,
  spacing,
  typography,
  light: lightTheme,
  dark: darkTheme,
};

export type ThemeType = typeof theme.light;
