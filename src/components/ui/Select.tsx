import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { theme } from '../../theme';

interface SelectProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  error?: string;
  mode?: 'light' | 'dark';
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  mode = 'dark',
}) => {
  const current = theme[mode];

  const styles = StyleSheet.create({
    container: { marginBottom: theme.spacing.md },
    label: {
      fontSize: theme.typography.fontSize.sm,
      color: current.subText || theme.colors.gray600,
      marginBottom: 4,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: error ? theme.colors.error : current.inputBorder,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: current.inputBackground,
    },
    picker: {
      height: 55,
      width: '100%',
      color: current.inputText,
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

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
          dropdownIconColor={current.inputText}
        >
          {options.map(opt => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
