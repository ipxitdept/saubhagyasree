
import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const createGlobalStyles = (mode: 'light' | 'dark' = 'dark') => {
  const current = theme[mode];

  return StyleSheet.create({
   
    container: {
      flex: 1,
      backgroundColor: current.background,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    centered: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spaceBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    textPrimary: {
      color: current.text,
      fontSize: theme.typography.fontSize.md,
      fontFamily: theme.typography.fontFamily.regular,
    },
    textSecondary: {
      color: theme.colors.gray500,
      fontSize: theme.typography.fontSize.sm,
      fontFamily: theme.typography.fontFamily.regular,
    },
    textHeading: {
      color: current.text,
      fontSize: theme.typography.fontSize.xl,
      fontFamily: theme.typography.fontFamily.bold,
    },

    shadow: {
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    card: {
      backgroundColor: current.card,
      borderRadius: 10,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: current.border,
    },
    divider: {
      height: 1,
      backgroundColor: current.border,
      marginVertical: theme.spacing.sm,
    },
     sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
    // content_center: {
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
  });
};
