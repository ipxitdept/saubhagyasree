
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FileSelector from 'react-native-file-selector';
import { theme } from '../../theme';

interface FileInputProps {
  label?: string;
  value?: { name: string; uri: string; type?: string } | null;
  onChange: (file: any | null) => void;
  error?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  const handlePickFile = async () => {
    try {
      const result = await FileSelector.show({
        title: 'Select a file',
        multi: false,
      });

      if (result) {
        // result might have different properties depending on platform
        onChange({
          name: result.name || result.uri.split('/').pop(),
          uri: result.uri,
          type: result.type, // might be undefined on some platforms
        });
      }
    } catch (err) {
      console.error('File picker error:', err);
      onChange(null);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.uploadButton,
          error && { borderColor: theme.colors.error },
        ]}
        onPress={handlePickFile}
      >
        <Text style={styles.uploadText}>
          {value ? value.name : 'Choose File'}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: theme.spacing.md },
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray600,
    marginBottom: 4,
  },
  uploadButton: {
    paddingVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: theme.colors.gray800,
    fontSize: theme.typography.fontSize.md,
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.sm,
    marginTop: 4,
  },
});
