import { colors } from './colors';

export const darkTheme = {
  mode: 'dark',
  background: colors.jetblack,       // app background
  surface: colors.gray900,           // card or section background
  text: colors.white,                // primary text
  subText: colors.gray400,           // secondary or placeholder text

  inputBackground: colors.gray800,   // background for input boxes
  inputBorder: colors.gray600,       // normal input border
  inputBorderActive: colors.primary, // focused input border
  inputText: colors.white,           // text inside input
  inputPlaceholder: colors.gray500,  // placeholder text color

  card: '#d953af',   
    // card: '#1C1C1C',          
  border: colors.gray700,
  tint: colors.primaryLight,

  success: colors.success,
  warning: colors.warning,
  error: colors.error,

  tabIconDefault: colors.gray500,
  tabIconSelected: colors.primaryLight,
};
