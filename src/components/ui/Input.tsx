
import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  mode?: 'light' | 'dark'; 
}

export const Input: React.FC<InputProps> = ({ label, error, mode = 'dark', ...props }) => {
  const current = theme[mode]; 

  const styles = StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
    },
    label: {
      fontSize: theme.typography.fontSize.sm,
      color: current.subText || theme.colors.gray600,
      marginBottom: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: error ? theme.colors.error : current.inputBorder,
      borderRadius: 8,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      fontSize: theme.typography.fontSize.md,
      color: current.inputText,
      backgroundColor: current.inputBackground, 
    },
    error: {
      color: theme.colors.error,
      fontSize: theme.typography.fontSize.sm,
      marginTop: 4,
    },
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholderTextColor={current.inputPlaceholder}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};
