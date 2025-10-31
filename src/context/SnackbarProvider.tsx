import React, { createContext, useContext, ReactNode } from 'react';
import Snackbar from 'react-native-snackbar';

type SnackbarVariant = 'success' | 'error' | 'warning' | 'info';

interface SnackbarOptions {
  variant?: SnackbarVariant;
  duration?: number;
  action?: {
    text: string;
    textColor?: string;
    onPress: () => void;
  };
  backgroundColor?: string;
}

interface SnackbarContextType {
  enqueueSnackbar: (message: string, options?: SnackbarOptions) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const enqueueSnackbar = (message: string, options: SnackbarOptions = {}) => {
    let backgroundColor = 'green';

    switch (options.variant) {
      case 'error':
        backgroundColor = 'red';
        break;
      case 'warning':
        backgroundColor = 'orange';
        break;
      case 'info':
        backgroundColor = 'blue';
        break;
      case 'success':
        backgroundColor = 'green';
        break;
    }

    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor,
      ...options,
    });
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
